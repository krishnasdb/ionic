import {Component, Directive, Host, ElementRef, Optional, forwardRef, Inject, ContentChildren, ContentChild, QueryList, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';

import {Button} from '../button/button';
import {Config} from '../../config/config';
import {Ion} from '../ion';
import {MenuToggle} from '../menu/menu-toggle';
import {Navbar} from '../navbar/navbar';
import {ViewController} from '../nav/view-controller';


/**
 * @private
 */
@Directive({
  selector: 'ion-header'
})
export class Header {

  constructor(@Optional() viewCtrl: ViewController) {
    viewCtrl && viewCtrl.setHeader(this);
  }

}


/**
 * @private
 */
@Directive({
  selector: 'ion-footer'
})
export class Footer {

  constructor(@Optional() viewCtrl: ViewController) {
    viewCtrl && viewCtrl.setFooter(this);
  }

}


/**
 * @private
 */
export class ToolbarBase extends Ion {
  itemRefs: ElementRef[] = [];
  titleRef: any = null;
  titleCmp: any;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  /**
   * @private
   */
  setTitleCmp(titleCmp: any) {
    this.titleCmp = titleCmp;
  }

  /**
   * @private
   * Returns the toolbar title text if it exists or an empty string
   */
  getTitleText() {
    return (this.titleCmp && this.titleCmp.getTitleText()) || '';
  }

  /**
   * @private
   */
  getTitleRef() {
    return this.titleCmp && this.titleCmp.elementRef;
  }

  /**
   * @private
   * A toolbar items include the left and right side `ion-buttons`,
   * and every `menu-toggle`. It does not include the `ion-title`.
   * @returns {TODO} Array of this toolbar's item ElementRefs.
   */
  getItemRefs() {
    return this.itemRefs;
  }

  /**
   * @private
   */
  addItemRef(itemElementRef: ElementRef) {
    this.itemRefs.push(itemElementRef);
  }

}

/**
 * @name Toolbar
 * @description
 * A Toolbar is a generic bar that is positioned above or below content.
 * Unlike a [Navbar](../../nav/Navbar), a toolbar can be used as a subheader.
 * When toolbars are placed within an `<ion-header>` or `<ion-footer>`,
 * the toolbars stay fixed in their respective location. When placed within
 * `<ion-content>`, toolbars will scroll with the content.
 *
 *
 * ### Buttons in a Toolbar
 * Buttons placed in a toolbar should be placed inside of the `<ion-buttons>`
 * element. An exception to this is a [menuToggle](../../menu/MenuToggle) button.
 * It should not be placed inside of the `<ion-buttons>` element. Both the
 * `<ion-buttons>` element and the `menuToggle` can be positioned inside of the
 * toolbar using different properties. The below chart has a description of each
 * property.
 *
 * | Property    | Description                                                                                                           |
 * |-------------|-----------------------------------------------------------------------------------------------------------------------|
 * | `start`     | Positions element to the left of the content in `ios` mode, and directly to the right in `md` and `wp` mode.    |
 * | `end`       | Positions element to the right of the content in `ios` mode, and to the far right in `md` and `wp` mode.        |
 * | `left`      | Positions element to the left of all other elements.                                                            |
 * | `right`     | Positions element to the right of all other elements.                                                           |
 *
 * See [usage](#usage) below for some examples.
 *
 *
 * @usage
 * ```html
 * <ion-header>
 *
 *   <ion-toolbar>
 *     <ion-buttons start>
 *       <button>
 *         <ion-icon name="contact"></ion-icon>
 *       </button>
 *       <button>
 *         <ion-icon name="search"></ion-icon>
 *       </button>
 *     </ion-buttons>
 *     <ion-title>My Toolbar Title</ion-title>
 *   </ion-toolbar>
 *
 *   <ion-toolbar>
 *     <ion-title>I'm a subheader</ion-title>
 *   </ion-toolbar>
 *
 * <ion-header>
 *
 *
 * <ion-content>
 *
 *   <ion-toolbar>
 *     <ion-title>Scrolls with the content</ion-title>
 *   </ion-toolbar>
 *
 * </ion-content>
 *
 *
 * <ion-footer>
 *
 *   <ion-toolbar>
 *     <ion-title>I'm a subfooter</ion-title>
 *     <ion-buttons right>
 *       <button>
 *         <ion-icon name="menu"></ion-icon>
 *       </button>
 *     </ion-buttons>
 *   </ion-toolbar>
 *
 *   <ion-toolbar>
 *     <ion-title>I'm a footer</ion-title>
 *     <ion-buttons end>
 *       <button>
 *         <ion-icon name="more"></ion-icon>
 *       </button>
 *       <button>
 *         <ion-icon name="options"></ion-icon>
 *       </button>
 *     </ion-buttons>
 *   </ion-toolbar>
 *
 * </ion-footer>
 *  ```
 *
 * @demo /docs/v2/demos/toolbar/
 * @see {@link ../../navbar/Navbar/ Navbar API Docs}
 */
@Component({
  selector: 'ion-toolbar',
  template:
    '<div class="toolbar-background"></div>' +
    '<ng-content select="[menuToggle],ion-buttons[left]"></ng-content>' +
    '<ng-content select="ion-buttons[start]"></ng-content>' +
    '<ng-content select="ion-buttons[end],ion-buttons[right]"></ng-content>' +
    '<div class="toolbar-content">' +
      '<ng-content></ng-content>' +
    '</div>',
  host: {
    'class': 'toolbar',
    '[class.statusbar-padding]': '_sbPadding'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toolbar extends ToolbarBase {
  private _sbPadding: boolean;

  constructor(
    @Optional() viewCtrl: ViewController,
    elementRef: ElementRef,
    config: Config
  ) {
    super(elementRef);
    viewCtrl && viewCtrl.setToolbarRef(elementRef);
    this._sbPadding = config.getBoolean('statusbarPadding');
  }

}
