'use client'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

type Props = {
  contents: React.ReactNode[]
  minHeight?: number
}

/**
 * Banner 컴포넌트
 *
 * - 여러 콘텐츠를 순차적으로 보여주는 슬라이더 배너입니다.
 * - `keen-slider`를 기반으로 자동 재생(loop) 기능을 제공합니다.
 * - 마우스를 올리면 자동 재생이 일시 정지되고, 마우스를 치우면 다시 재생됩니다.
 *
 * @param contents 렌더링할 React 노드 배열 (각각의 배너 콘텐츠)
 * @param minHeight 배너의 최소 높이(px). 기본값은 150입니다.
 *
 * @example
 * ```tsx
 * <Banner
 *   contents={[
 *     <div>배너 1</div>,
 *     <div>배너 2</div>,
 *     <div>배너 3</div>,
 *   ]}
 *   minHeight={200}
 * />
 * ```
 */
export const Banner = ({ contents, minHeight = 150 }: Props) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 2000)
        }
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on('dragStarted', clearNextTimeout)
        slider.on('animationEnded', nextTimeout)
        slider.on('updated', nextTimeout)
      },
    ],
  )

  return (
    <div ref={sliderRef} className={'keen-slider'} style={{ minHeight }}>
      {contents.map((content, index) => (
        <div key={index} className='keen-slider__slide bg-gray-100'>
          {content}
        </div>
      ))}
    </div>
  )
}
