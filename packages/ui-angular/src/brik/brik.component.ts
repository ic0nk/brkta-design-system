import { Component, Input } from '@angular/core';
import {
  BRIK_VIEW_BOX,
  brikCellClass,
  brikParts,
  brikSleepMarks,
  type BrikState,
} from '@brkta/ui-core/brik/brik-contract';

/** Brik, the BRKTA companion. Pure SVG + CSS (see @brkta/ui-core/brik/brik.css). */
@Component({
  selector: 'brkta-brik',
  standalone: true,
  template: `
    <svg
      [attr.data-brkta-brik]="''"
      [attr.data-state]="state"
      [attr.viewBox]="viewBox"
      shape-rendering="crispEdges"
      [attr.role]="label ? 'img' : null"
      [attr.aria-label]="label || null"
      [attr.aria-hidden]="label ? null : 'true'"
      [attr.focusable]="label ? null : 'false'"
    >
      <g class="brkta-brik-all">
        <g class="brkta-brik-body">
          @for (c of parts.body; track $index) {
            <rect [attr.class]="cls(c)" [attr.x]="c.x" [attr.y]="c.y" [attr.width]="c.width" [attr.height]="c.height" />
          }
          <g class="brkta-brik-face">
            <g class="brkta-brik-eyes">
              @for (c of parts.eyes; track $index) {
                <rect [attr.class]="cls(c)" [attr.x]="c.x" [attr.y]="c.y" [attr.width]="c.width" [attr.height]="c.height" />
              }
            </g>
            <g class="brkta-brik-lids">
              @for (c of parts.lids; track $index) {
                <rect [attr.class]="cls(c)" [attr.x]="c.x" [attr.y]="c.y" [attr.width]="c.width" [attr.height]="c.height" />
              }
            </g>
            @for (c of parts.cheeks; track $index) {
              <rect [attr.class]="cls(c)" [attr.x]="c.x" [attr.y]="c.y" [attr.width]="c.width" [attr.height]="c.height" />
            }
            <g class="brkta-brik-smile">
              @for (c of parts.smile; track $index) {
                <rect [attr.class]="cls(c)" [attr.x]="c.x" [attr.y]="c.y" [attr.width]="c.width" [attr.height]="c.height" />
              }
            </g>
            <g class="brkta-brik-mouth">
              @for (c of parts.mouth; track $index) {
                <rect [attr.class]="cls(c)" [attr.x]="c.x" [attr.y]="c.y" [attr.width]="c.width" [attr.height]="c.height" />
              }
            </g>
          </g>
          @for (c of parts.legs; track $index) {
            <rect [attr.class]="cls(c)" [attr.x]="c.x" [attr.y]="c.y" [attr.width]="c.width" [attr.height]="c.height" />
          }
        </g>
        <g class="brkta-brik-arm">
          @for (c of parts.arm; track $index) {
            <rect [attr.class]="cls(c)" [attr.x]="c.x" [attr.y]="c.y" [attr.width]="c.width" [attr.height]="c.height" />
          }
        </g>
        <g class="brkta-brik-sleep">
          @for (m of sleepMarks; track $index) {
            <text class="brkta-brik-z" [attr.x]="m.x" [attr.y]="m.y">z</text>
          }
        </g>
        <g class="brkta-brik-confetti">
          @for (c of parts.confetti; track $index) {
            <rect [attr.class]="cls(c)" [attr.x]="c.x" [attr.y]="c.y" [attr.width]="c.width" [attr.height]="c.height" />
          }
        </g>
      </g>
    </svg>
  `,
})
export class BrikComponent {
  /** Pose / animation loop. */
  @Input() state: BrikState = 'idle';
  /** Accessible name. Omit for decorative use. */
  @Input() label = '';

  readonly viewBox = BRIK_VIEW_BOX;
  readonly parts = brikParts;
  readonly sleepMarks = brikSleepMarks;
  readonly cls = brikCellClass;
}
