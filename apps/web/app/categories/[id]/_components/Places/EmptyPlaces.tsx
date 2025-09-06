'use client'

import { useEffect, useRef } from 'react'
import { Column, Flex } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'
import { Icon } from '@repo/ui/components/Icon'
import { Engine, Runner, World, Bodies, Events } from 'matter-js'

export const EmptyPlaces = () => {
  const containerRef = useRef<HTMLDivElement | null>(null) // 낙하 영역
  const ballRef = useRef<HTMLDivElement | null>(null) // "텅"을 담는 DOM
  const engineRef = useRef<Engine | null>(null)
  const runnerRef = useRef<Runner | null>(null)

  useEffect(() => {
    const container = containerRef.current!
    const ballEl = ballRef.current!
    const width = container.clientWidth || 300
    const height = container.clientHeight || 100

    // 1) 엔진 생성 (렌더 없음)
    const engine = Engine.create()
    engine.gravity.y = 1
    engineRef.current = engine

    // 2) 바닥 & 텍스트 크기 측정
    const groundThickness = 1
    const textRect = ballEl.getBoundingClientRect()
    const ballW = textRect.width || 100
    const ballH = textRect.height || 100

    const ground = Bodies.rectangle(
      width / 2,
      height - groundThickness / 2,
      width,
      groundThickness,
      { isStatic: true },
    )

    // 3) "텅"에 대응하는 물리 바디 (처음엔 위쪽에서 떨어짐)
    const ballBody = Bodies.rectangle(width / 2, -ballH, ballW, ballH, {
      restitution: 0.7, // 살짝만 튐
      friction: 0.02,
      frictionAir: 0.02, // 감쇠
      inertia: Infinity, // 회전 막기 (글자 안 돌아가게)
    })

    World.add(engine.world, [ground, ballBody])

    // 4) 매 프레임마다 물리 좌표 → DOM transform 동기화
    const updateDOM = () => {
      const { x, y } = ballBody.position
      // 컨테이너 좌상단 기준으로 배치 (DOM 요소의 중심을 물리 바디 중심에 정렬)
      ballEl.style.transform = `translate(${x - ballW / 2}px, ${y - ballH / 2}px)`
    }

    // 엔진 업데이트 후 DOM 반영
    const afterUpdate = () => updateDOM()
    Events.on(engine, 'afterUpdate', afterUpdate)

    // 초기 위치 반영
    updateDOM()

    // 5) 러너 가동 (렌더 없이 물리만 갱신)
    const runner = Runner.create()
    runnerRef.current = runner
    Runner.run(runner, engine)

    return () => {
      Events.off(engine, 'afterUpdate', afterUpdate)
      if (runnerRef.current) Runner.stop(runnerRef.current)
      if (engineRef.current) {
        World.clear(engine.world, false)
        Engine.clear(engine)
      }
    }
  }, [])

  return (
    <Column className={'my-auto items-center gap-2 pb-40'}>
      {/* 낙하 영역: 상대 좌표계 */}
      <div ref={containerRef} className={'h-25 w-25'}>
        {/* 실제 보이는 "텅" (DOM 요소를 물리 좌표에 맞춰 translate) */}
        <div ref={ballRef} className={'absolute will-change-transform'}>
          <Text
            as={'span'}
            className={'text-[100px] leading-[100px]'}
            fontWeight={'black'}
          >
            텅
          </Text>
        </div>
      </div>

      <Flex>
        <Text variant={'body3'} className={'text-gray-300'}>
          근처에 갈 수 있는 맛집이 없어요
        </Text>
        <Icon type={'cry'} size={14} />
      </Flex>
    </Column>
  )
}
