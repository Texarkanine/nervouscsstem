# Active Context

## Current Task
M1: Fix barberpole stripe opacity

## Phase
BUILD - COMPLETE

## What Was Done
Fixed barberpole stripe opacity bug: both bands now fully opaque (dark bands use --nerv-bg-rgb, bright bands use --nerv-stripe-color-rgb, both at alpha 1). Added configurable glow border via --nerv-stripe-glow-spread custom property (default 0px). All 179 tests pass, lint clean.

## Next Step
Proceed to QA phase.
