'use client'

import { useState, type ReactNode } from 'react'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { cn } from '@repo/ui/utils/cn'

type Props = {
  minHeight?: number
  showIndicator?: boolean
  children: ReactNode[]
}

/**
 * Carousel 컴포넌트
 *
 * - 여러 콘텐츠를 순차적으로 보여주는 슬라이더 배너입니다.
 * - `keen-slider`를 기반으로 자동 재생(loop) 기능을 제공합니다.
 * - 마우스를 올리면 자동 재생이 일시 정지되고, 마우스를 치우면 다시 재생됩니다.
 *
 * @param children 렌더링할 React 노드 배열 (각각의 배너 콘텐츠)
 * @param minHeight 배너의 최소 높이(px). 기본값은 150입니다.
 * @param showIndicator 인디케이터 노출 유무. 기본값은 false 입니다.
 *
 * @example
 * ```tsx
 * <Carousel minHeight={200}>
 *   <div>배너 1</div>
 *   <div>배너 2</div>
 *   <div>배너 3</div>
 * </Carousel>
 * ```
 */
export const Carousel = ({
  minHeight = 150,
  showIndicator = false,
  children,
}: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: children.length > 1,
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setLoaded(true)
      },
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
            if (slider.track && slider.track.details) {
              slider.next()
            }
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
        slider.on('destroyed', clearNextTimeout)
      },
    ],
  )

  if (children.length === 0) {
    return null
  }

  return (
    <div
      ref={sliderRef}
      className={'keen-slider ui:relative'}
      style={{ minHeight }}
    >
      {children.map((content, index) => (
        <div
          key={index}
          className={cn(
            'keen-slider__slide bg-white',
            !loaded && index !== 0 && 'hidden',
          )}
        >
          {content}
        </div>
      ))}
      {showIndicator && loaded && instanceRef.current && (
        <div
          className={cn(
            'ui:absolute',
            'ui:bottom-2',
            'ui:right-3',
            'ui:gap-2',
            'ui:bg-gray-50',
            'ui:text-gray-300',
            'ui:py-0.5 px-2',
            'ui:rounded-full',
            'ui:text-xs',
            'ui:font-semibold',
          )}
        >
          {currentSlide + 1}
          {` `}/{` `}
          {instanceRef.current.track?.details?.slides.length ?? 0}
        </div>
      )}
    </div>
  )
}
