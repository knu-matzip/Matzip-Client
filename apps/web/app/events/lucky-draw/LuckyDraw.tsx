'use client'

import { Column, JustifyBetween } from '@repo/ui/components/Layout'
import { useFunnel } from '@/_hooks/useFunnel'
import { NavBarItem } from './_components/NavBarItem'
import { Result } from './_components/Pages'

export type StepType = 'participation' | 'result'
const STEP_ORDER: Record<StepType, string> = {
  participation: 'participation',
  result: 'result',
}
const STEP_NAME = {
  participation: '응모 하기',
  result: '응모 결과',
}
const TABS: StepType[] = ['participation', 'result']

export const LuckyDraw = () => {
  const { nextStep, Step, step } = useFunnel(STEP_ORDER, 'tab')

  return (
    <>
      <Column className={'h-full p-5'}>
        <JustifyBetween as={'nav'} className={'gap-10'}>
          {TABS.map((tab) => (
            <NavBarItem
              key={tab}
              isActive={step === tab}
              name={STEP_NAME[tab]}
              onClick={() => {
                nextStep(tab)
              }}
            />
          ))}
        </JustifyBetween>
        <Step name={'result'}>
          <Result />
        </Step>
      </Column>
    </>
  )
}
