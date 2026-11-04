import type { ImgHTMLAttributes } from "react";
import {CachedImage} from "../../shared/CachedImage";
export default function Image({ src,alt="",fill:_fill,priority:_priority,unoptimized:_unoptimized,...props }: Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & { src: string | { src:string }; fill?:boolean; priority?:boolean; unoptimized?:boolean }) { void _fill;void _priority;void _unoptimized;return <CachedImage {...props} src={typeof src==="string"?src:src.src} alt={alt}/>; }
