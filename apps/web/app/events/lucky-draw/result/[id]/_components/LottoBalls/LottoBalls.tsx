'use client'

import { useEffect, useRef } from 'react'
import Matter, { Engine, Runner, World, Bodies, Body, Events } from 'matter-js'
import { cn } from '@repo/ui/utils/cn'
import { Column } from '@repo/ui/components/Layout'

interface LottoBallsProps {
  isRunning: boolean
}

export const LottoBalls = ({ isRunning }: LottoBallsProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const ballRefs = useRef<HTMLDivElement[]>([])
  const engineRef = useRef<Engine | null>(null)
  const runnerRef = useRef<Runner | null>(null)
  const ballsRef = useRef<Matter.Body[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth
    const radius = width / 2

    const engine = Engine.create()
    engine.gravity.y = 1
    engine.constraintIterations = 2
    engine.positionIterations = 6
    engine.velocityIterations = 4
    engine.enableSleeping = false

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

    // DOM 업데이트
    const updateDOM = () => {
      balls.forEach((ball, i) => {
        const el = ballRefs.current[i]
        if (!el) return

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
          const currentSpeed = Math.hypot(ball.velocity.x, ball.velocity.y)
          if (currentSpeed > 0.1) {
            Body.setVelocity(ball, {
              x: ball.velocity.x * 0.98,
              y: ball.velocity.y * 0.98,
            })
            Body.setAngularVelocity(ball, ball.angularVelocity * 0.98)
          }
        }

        el.style.transform = `translate(${ball.position.x - 12}px, ${ball.position.y - 12}px) rotate(${ball.angle}rad)`
      })
    }
    Events.on(engine, 'afterUpdate', updateDOM)

    const runner = Runner.create()
    runnerRef.current = runner
    Runner.run(runner, engine)

    return () => {
      Events.off(engine, 'afterUpdate', updateDOM)
      if (runnerRef.current) Runner.stop(runnerRef.current)
      World.clear(world, false)
      Engine.clear(engine)
    }
  }, [isRunning])

  useEffect(() => {
    if (!engineRef.current) return

    if (isRunning) {
      engineRef.current.gravity.y = 0
      ballsRef.current.forEach((ball) => {
        Body.setVelocity(ball, {
          x: (Math.random() - 0.5) * 6,
          y: (Math.random() - 0.5) * 6,
        })
        Body.setAngularVelocity(ball, (Math.random() - 0.5) * 0.1)
      })
    } else {
      engineRef.current.gravity.y = 1
      ballsRef.current.forEach((ball) => {
        Body.setVelocity(ball, { x: 0, y: 0 })
        Body.setAngularVelocity(ball, 0)
      })
    }
  }, [isRunning])

  const colors = [
    'bg-yellow-400',
    'bg-blue-400',
    'bg-red-400',
    'bg-green-400',
    'bg-purple-400',
  ]

  return (
    <Column className='items-center gap-4'>
      <Column className='items-center'>
        <div
          ref={containerRef}
          className={cn(
            'relative',
            'h-50 w-50',
            'rounded-full',
            'shadow-[inset_0_4px_20px_rgba(255,255,255,0.4),_0_0px_10px_rgba(0,0,0,0.25)]',
          )}
        >
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                ballRefs.current[i] = el!
              }}
              className={cn(
                'absolute h-6 w-6 rounded-full',
                colors[i % colors.length],
              )}
            />
          ))}
        </div>
        <div
          className={cn(
            'z-10',
            'w-32',
            '-mt-4',
            'rounded-full',
            'border-10 border-red-400',
          )}
        />
      </Column>
    </Column>
  )
}
