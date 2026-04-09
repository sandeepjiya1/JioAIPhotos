import { cn } from '@/lib'

export type JioLogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'splash'

export interface JioLogoProps {
  size?: JioLogoSize
  className?: string
}

const sizeMap: Record<JioLogoSize, string> = {
  xs:     'size-5',
  sm:     'size-6',
  md:     'size-8',
  lg:     'size-12',
  splash: 'size-32',
}

/**
 * Wordmark lockup vs circle (brand reference):
 * glyphs span ~25×14.4 in a 32×32 viewBox. To get ~77.5% width & ~45% height of the circle,
 * scale the square SVG by (0.775 × 32/25) ≈ 99.2% of the container diameter.
 */
const WORDMARK_SVG_SCALE = `${0.775 * (32 / 25) * 100}%` // 99.2%

/** Official Jio wordmark paths (Figma / brand SVG), viewBox 0 0 32 32 */
const JIO_WORDMARK_PATH =
  'M11.3039 9.64982H10.7705C9.75837 9.64982 9.20548 10.2205 9.20548 11.3621V16.8679C9.20548 18.2854 8.72667 18.7829 7.60341 18.7829C6.71985 18.7829 6.00192 18.3959 5.43096 17.6963C5.37555 17.6229 4.21615 18.1749 4.21615 19.5378C4.21615 21.0107 5.5963 21.9132 8.15689 21.9132C11.268 21.9132 12.9077 20.3479 12.9077 16.9233V11.3621C12.9059 10.222 12.3536 9.64982 11.3039 9.64982ZM23.7039 12.3381C20.6837 12.3381 18.6769 14.2531 18.6769 17.1085C18.6769 20.0365 20.6096 21.915 23.6482 21.915C26.6674 21.915 28.6556 20.0365 28.6556 17.1274C28.6573 14.2531 26.6867 12.3381 23.7039 12.3381ZM23.6668 19.206C22.4879 19.206 21.6781 18.3408 21.6781 17.107C21.6781 15.8922 22.5077 15.0264 23.6668 15.0264C24.8259 15.0264 25.6553 15.8922 25.6553 17.1257C25.6556 18.3221 24.8087 19.206 23.6671 19.206H23.6668ZM16.1252 12.43H15.7563C14.8547 12.43 14.1735 12.8531 14.1735 14.1426V20.0347C14.1735 21.3423 14.8366 21.7476 15.7936 21.7476H16.1622C17.0644 21.7476 17.7086 21.3052 17.7086 20.0347V14.1426C17.7086 12.8169 17.0831 12.43 16.1252 12.43ZM15.9228 8.15885C14.7809 8.15885 14.063 8.8036 14.063 9.81634C14.063 10.8469 14.7999 11.4913 15.9779 11.4913C17.1196 11.4913 17.8378 10.8469 17.8378 9.81634C17.8378 8.78582 17.1012 8.15885 15.9228 8.15885Z'

export function JioLogo({ size = 'md', className }: JioLogoProps) {
  const outer = sizeMap[size]
  return (
    <div
      role="img"
      aria-label="Jio"
      className={cn(
        'shrink-0 rounded-full bg-primary-600 overflow-hidden',
        'flex items-center justify-center',
        outer,
        className,
      )}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 text-white"
        style={{ width: WORDMARK_SVG_SCALE, height: WORDMARK_SVG_SCALE }}
        aria-hidden="true"
        focusable="false"
      >
        <path fill="currentColor" d={JIO_WORDMARK_PATH} />
      </svg>
    </div>
  )
}
