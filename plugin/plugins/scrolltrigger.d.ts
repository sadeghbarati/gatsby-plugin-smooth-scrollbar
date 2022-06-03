import Scrollbar from 'smooth-scrollbar';
import { ScrollbarOptions } from 'smooth-scrollbar/interfaces';

/*!
 * SmoothScrollbar GSAP ScrollTrigger Plugin
 *
 * @version 1.0.1
 * @author Artem Dordzhiev (Draft)
 */

declare class ScrollTriggerPlugin extends Scrollbar.ScrollbarPlugin {
    constructor(scrollbar: Scrollbar, options: ScrollbarOptions);
    setProxy(): void;
}

export { ScrollTriggerPlugin as default };
