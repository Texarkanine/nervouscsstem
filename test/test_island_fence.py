"""Behavior of the ``html island`` superfences fence (scripts/nervouscsstem_docs).

Run: uv run python -m unittest discover -s test -v
"""

import unittest

import markdown
from pymdownx.superfences import SuperFencesException

from nervouscsstem_docs import island_fence

BODY = '<p class="nerv-type-hud">SUBJECT 00</p>\n<div class="nerv-bar-meter" data-bars="4"></div>'
SCRIPT = "<script>\n  NERV.initBarMeters(document.querySelector('.nerv-bar-meter').parentElement);\n</script>"


def render(text, island_class="nerv-docs-island", register=True):
    fences = []
    if register:
        fences.append({
            "name": "html",
            "class": island_class,
            "validator": island_fence.validator,
            "format": island_fence.formatter,
        })
    md = markdown.Markdown(
        extensions=["pymdownx.superfences"],
        extension_configs={"pymdownx.superfences": {"custom_fences": fences}},
    )
    return md.convert(text)


def fence(header, body):
    return f"```{header}\n{body}\n```\n"


def split_island(html):
    """Return (island div, rest) for output that starts with an island."""
    end = html.index("</div>\n<div class=\"highlight\">") + len("</div>\n")
    return html[:end], html[end:]


class IslandFenceTest(unittest.TestCase):
    def test_plain_html_fence_is_stock(self):
        """A fence without ``island`` renders exactly like stock superfences."""
        text = fence("html", BODY)
        self.assertEqual(render(text), render(text, register=False))
        self.assertNotIn("nerv-docs-island", render(text))

    def test_island_wraps_body_then_stock_copy(self):
        """``island`` emits the body in a ``nerv-docs-island`` div, then the stock highlight."""
        island, copy = split_island(render(fence("html island", BODY)))
        self.assertEqual(island, f'<div class="nerv-docs-island">\n{BODY}\n</div>\n')
        self.assertEqual(copy, render(fence("html", BODY), register=False))

    def test_island_class_comes_from_fence_config(self):
        """The island class is the fence's configured ``class:``."""
        island, _ = split_island(render(fence("html island", BODY), island_class="demo-box"))
        self.assertTrue(island.startswith('<div class="demo-box">\n'))

    def test_script_stripped_from_island_kept_in_copy(self):
        """``<script>`` is removed from the island and kept in the highlighted copy."""
        source = f"{BODY}\n{SCRIPT}"
        island, copy = split_island(render(fence("html island", source)))
        self.assertEqual(island, f'<div class="nerv-docs-island">\n{BODY}\n</div>\n')
        self.assertEqual(copy, render(fence("html", source), register=False))
        self.assertIn("initBarMeters", copy)

    def test_script_variants_stripped(self):
        """Attributes, uppercase tags, multi-line bodies, and several scripts are all removed."""
        source = "\n".join([
            '<script type="module">\n  import "x";\n</script>',
            "<p>A</p>",
            "<SCRIPT>NERV.initHexFlicker(x);</SCRIPT>",
            "<p>B</p>",
            "  <script src=\"y.js\"></script>",
        ])
        island, _ = split_island(render(fence("html island", source)))
        self.assertEqual(island, '<div class="nerv-docs-island">\n<p>A</p>\n<p>B</p>\n</div>\n')

    def test_init_option_sets_data_nerv_init(self):
        """``init="kind"`` puts ``data-nerv-init`` on the island only."""
        island, copy = split_island(render(fence('html island init="bar-meters"', BODY)))
        self.assertTrue(island.startswith('<div class="nerv-docs-island" data-nerv-init="bar-meters">\n'))
        self.assertNotIn("data-nerv-init", copy)

    def test_state_option_adds_state_class(self):
        """``state="name"`` adds ``nerv-state-name`` to the island class only."""
        island, copy = split_island(render(fence('html island state="alert"', BODY)))
        self.assertTrue(island.startswith('<div class="nerv-docs-island nerv-state-alert">\n'))
        self.assertNotIn("nerv-state", copy)

    def test_init_and_state_together(self):
        """Both options apply to the same island."""
        island, _ = split_island(render(fence('html island state="critical" init="radar"', BODY)))
        self.assertTrue(island.startswith(
            '<div class="nerv-docs-island nerv-state-critical" data-nerv-init="radar">\n'
        ))

    def test_copy_matches_plain_fence_in_same_document(self):
        """The island's copy equals a plain ``html`` fence of the same body on the same page."""
        html = render(fence("html", BODY) + "\n" + fence("html island", BODY))
        blocks = html.split('<div class="highlight">')
        self.assertEqual(len(blocks), 3)
        self.assertEqual(blocks[1].split("</div>")[0], blocks[2].split("</div>")[0])

    def test_unknown_option_fails_build(self):
        """An unknown key next to ``island`` raises ``SuperFencesException``."""
        with self.assertRaises(SuperFencesException):
            render(fence('html island inti="radar"', BODY))

    def test_valueless_option_fails_build(self):
        """Bare ``init`` or ``state`` raises ``SuperFencesException``."""
        for header in ("html island init", "html island state"):
            with self.subTest(header=header), self.assertRaises(SuperFencesException):
                render(fence(header, BODY))

    def test_malformed_value_fails_build(self):
        """Values outside ``[a-z][a-z0-9-]*`` raise ``SuperFencesException``."""
        for header in (
            'html island state="Alert"',
            'html island init="bar meters"',
            "html island init='x\"y'",
            'html island state=""',
        ):
            with self.subTest(header=header), self.assertRaises(SuperFencesException):
                render(fence(header, BODY))

    def test_island_option_without_island_fails_build(self):
        """``init`` or ``state`` without ``island`` raises instead of rendering a dead fence."""
        for header in ('html init="radar"', 'html state="alert"'):
            with self.subTest(header=header), self.assertRaises(SuperFencesException):
                render(fence(header, BODY))


if __name__ == "__main__":
    unittest.main()
