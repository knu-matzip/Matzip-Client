'use client'

import { useEffect, useRef, useState } from 'react'
import Matter, { Engine, Runner, World, Bodies, Body, Events } from 'matter-js'
import { cn } from '@repo/ui/utils/cn'

export const LottoBalls: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const ballRefs = useRef<HTMLDivElement[]>([])
  const engineRef = useRef<Engine | null>(null)
  const runnerRef = useRef<Runner | null>(null)
  const ballsRef = useRef<Matter.Body[]>([])
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth
    const radius = width / 2

    // 엔진 생성 및 터널링 방지 설정
    const engine = Engine.create()
    engine.gravity.y = 1

    // 터널링 방지를 위한 엔진 설정
    engine.constraintIterations = 2 // 기본값보다 증가
    engine.positionIterations = 6 // 기본값보다 증가
    engine.velocityIterations = 4 // 기본값보다 증가
    engine.enableSleeping = false // 슬리핑 비활성화

    engineRef.current = engine
    const world = engine.world

    // 원형 경계
    const segments = 64
    const walls: Matter.Body[] = []
    for (let i = 0; i < segments; i++) {
      const angle1 = (i / segments) * Math.PI * 2
      const angle2 = ((i + 1) / segments) * Math.PI * 2
      const x1 = radius + Math.cos(angle1) * radius
      const y1 = radius + Math.sin(angle1) * radius
      const x2 = radius + Math.cos(angle2) * radius
      const y2 = radius + Math.sin(angle2) * radius
      const wall = Bodies.rectangle(
        (x1 + x2) / 2,
        (y1 + y2) / 2,
        Math.hypot(x2 - x1, y2 - y1),
        5,
        { isStatic: true, angle: Math.atan2(y2 - y1, x2 - x1) },
      )
      walls.push(wall)
    }
    World.add(world, walls)

    // 공 생성
    const ballCount = 15
    const balls: Matter.Body[] = []

    for (let i = 0; i < ballCount; i++) {
      const r = 12
      const ball = Bodies.circle(
        radius + (Math.random() - 0.5) * (radius * 1.5),
        radius + (Math.random() - 0.5) * (radius * 1.5),
        r,
        {
          restitution: 0.9,
          frictionAir: 0.005,
          density: 0.001,
        },
      )
      balls.push(ball)
    }
    ballsRef.current = balls
    World.add(world, balls)

    // DOM 동기화
    const updateDOM = () => {
      balls.forEach((ball, i) => {
        const el = ballRefs.current[i]
        if (!el) return

        // ✅ isRunning 상태일 때만 최소 속도 유지
        if (isRunning) {
          const speed = Math.hypot(ball.velocity.x, ball.velocity.y)
          const minSpeed = 2
          if (speed < minSpeed) {
            Body.setVelocity(ball, {
              x: (Math.random() - 0.5) * 10,
              y: (Math.random() - 0.5) * 10,
            })
          }
        } else {
          // 멈춤 상태에서는 점진적으로 공기 저항 증가
          const currentSpeed = Math.hypot(ball.velocity.x, ball.velocity.y)
          if (currentSpeed > 0.1) {
            Body.setVelocity(ball, {
              x: ball.velocity.x * 0.98, // 점진적으로 속도 감소
              y: ball.velocity.y * 0.98,
            })
            Body.setAngularVelocity(ball, ball.angularVelocity * 0.98)
          }
        }

        el.style.transform = `translate(${ball.position.x - 12}px, ${ball.position.y - 12}px) rotate(${ball.angle}rad)`
      })
    }

    Events.on(engine, 'afterUpdate', updateDOM)

    // Runner 생성 (항상 실행)
    const runner = Runner.create()
    runnerRef.current = runner
    Runner.run(runner, engine) // ✅ 항상 실행 (버튼으로 물리조건만 바꿈)

    return () => {
      Events.off(engine, 'afterUpdate', updateDOM)
      if (runnerRef.current) Runner.stop(runnerRef.current)
      World.clear(world, false)
      Engine.clear(engine)
    }
  }, [isRunning]) // ✅ isRunning을 dependency에 추가

  // 버튼 토글
  const handleToggle = () => {
    if (!engineRef.current) return

    if (isRunning) {
      // ✅ 멈춤 상태
      engineRef.current.gravity.y = 1 // 바닥으로 떨어지게
      ballsRef.current.forEach((ball) => {
        Body.setVelocity(ball, { x: 0, y: 0 })
        Body.setAngularVelocity(ball, 0)
      })
    } else {
      // ✅ 튀기기 상태
      engineRef.current.gravity.y = 0 // 중력 제거
      ballsRef.current.forEach((ball) => {
        Body.setVelocity(ball, {
          x: (Math.random() - 0.5) * 6, // 속도 더 줄임
          y: (Math.random() - 0.5) * 6,
        })
        Body.setAngularVelocity(ball, (Math.random() - 0.5) * 0.1)
      })
    }

    setIsRunning(!isRunning)
  }

  const colors = [
    'bg-yellow-400',
    'bg-blue-400',
    'bg-red-400',
    'bg-green-400',
    'bg-purple-400',
  ]

  return (
    <div className='flex flex-col items-center gap-4'>
      <div
        ref={containerRef}
        className='relative rounded-full border border-white/40 bg-white/20 shadow-inner backdrop-blur-md'
        style={{
          width: 200,
          height: 200,
          boxShadow:
            'inset 0 4px 20px rgba(255,255,255,0.4), 0 8px 30px rgba(0,0,0,0.25)',
        }}
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              ballRefs.current[i] = el!
            }}
            className={cn(
              'absolute flex h-6 w-6 rounded-full',
              colors[i % colors.length],
            )}
          />
        ))}
      </div>

      <button
        onClick={handleToggle}
        className='rounded-md bg-blue-500 px-4 py-2 text-white'
      >
        {isRunning ? '멈춤' : '튀기기'}
      </button>
    </div>
  )
}
