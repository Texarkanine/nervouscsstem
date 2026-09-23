"""Superfences custom fence: one ``html`` body becomes a live island plus its copy.

Registered in ``properdocs.yml``::

    - name: html
      class: nerv-docs-island
      validator: !!python/name:nervouscsstem_docs.island_fence.validator
      format: !!python/name:nervouscsstem_docs.island_fence.formatter

A fence opts in with a bare ``island`` option; without it the fence is a stock
highlighted ``html`` block. Island options:

- ``init="<kind>"`` puts ``data-nerv-init="<kind>"`` on the island so
  ``docs-init.js`` runs the matching scoped ``NERV.init*``.
- ``state="<name>"`` adds ``nerv-state-<name>`` to the island class.

The island receives the body with ``<script>`` elements removed. The copy is
the stock highlighted body, scripts included. Bad options raise
``SuperFencesException``, which aborts the build.
"""

import re

from pymdownx.superfences import SuperFencesException

ISLAND_OPTIONS = ("init", "state")
VALUE = re.compile(r"[a-z][a-z0-9-]*\Z")
SCRIPT = re.compile(r"[ \t]*<script\b.*?</script\s*>[ \t]*\n?", re.DOTALL | re.IGNORECASE)


def validator(language, inputs, options, attrs, md):
    """Accept ``island`` fences and move their options into ``options``.

    Returns ``False`` (so superfences falls through to the stock ``html``
    fence) when ``island`` is absent and no island option is used. Raises
    ``SuperFencesException`` for an island option without ``island``, an
    unknown key, or a missing or malformed value. Values must match
    ``[a-z][a-z0-9-]*``.
    """
    if "island" not in inputs:
        used = [key for key in ISLAND_OPTIONS if key in inputs]
        if used:
            raise SuperFencesException(f"html fence: {used[0]}= needs the island option")
        return False
    for key, value in inputs.items():
        if key == "island":
            continue
        if key not in ISLAND_OPTIONS:
            raise SuperFencesException(f"html island fence: unknown option {key!r}")
        if value == key or not VALUE.match(value):
            raise SuperFencesException(
                f'html island fence: {key} needs a value like {key}="name", got {value!r}'
            )
        options[key] = value
    return True


def formatter(src, language, class_name, options, md, **kwargs):
    """Return the island ``<div>`` followed by the stock highlighted fence.

    ``class_name`` is the fence's ``class:`` from the config and becomes the
    island class. ``kwargs`` (``classes``, ``id_value``, ``attrs``) are passed
    to the stock highlighter unchanged so the copy matches a plain ``html``
    fence.
    """
    classes = class_name
    if "state" in options:
        classes += f" nerv-state-{options['state']}"
    init = f' data-nerv-init="{options["init"]}"' if "init" in options else ""
    body = SCRIPT.sub("", src).rstrip()
    island = f'<div class="{classes}"{init}>\n{body}\n</div>\n'
    copy = md.preprocessors["fenced_code_block"].highlight(
        src=src, language=language, options={}, md=md, **kwargs
    )
    return island + copy
