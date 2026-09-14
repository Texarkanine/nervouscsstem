# Label box

CSS label box is a skewed button. By adding JavaScript you can radio-toggle a group.

`NERV.initLabelBoxGroups(container)` activates one box and clears siblings. `.nerv-label-box-active` is the selected state — you can set it in HTML without JS.

## Group

<div class="nerv-docs-island" data-nerv-init="label-box">
  <div class="nerv-label-box-group">
    <button class="nerv-label-box" type="button"><span>STOP</span></button>
    <button class="nerv-label-box" type="button"><span>SLOW</span></button>
    <button class="nerv-label-box nerv-label-box-active" type="button"><span>NORMAL</span></button>
    <button class="nerv-label-box" type="button"><span>RACING</span></button>
  </div>
</div>

**Spec:** `.nerv-label-box-group` is the row. `NERV.initLabelBoxGroups(container)` wires click-to-radio.

```html
<div class="nerv-label-box-group">
  <button class="nerv-label-box"><span>STOP</span></button>
  <button class="nerv-label-box nerv-label-box-active"><span>NORMAL</span></button>
</div>
<script>
  NERV.initLabelBoxGroups(document.getElementById('modes'));
</script>
```
