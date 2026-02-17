'use client'

import { useState } from 'react'
import { Column, JustifyBetween } from '@repo/ui/components/Layout'
import { NavBarItem } from './_components/NavBarItem'
import { InProgressEvent, FinishedEvent } from './_components/Pages'

export type StepType = 'inProgress' | 'finished'

const STEP_NAME = {
  inProgress: '진행중인 이벤트',
  finished: '종료된 이벤트',
}
const TABS: StepType[] = ['inProgress', 'finished']

export const LuckyDraw = () => {
  const [currentTab, setCurrentTab] = useState<StepType>('inProgress')

  return (
    <>
      <Column className={'h-full p-5'}>
        <JustifyBetween as={'nav'} className={'gap-10'}>
          {TABS.map((tab) => (
            <NavBarItem
              key={tab}
              isActive={currentTab === tab}
              name={STEP_NAME[tab]}
              onClick={() => {
                setCurrentTab(tab)
              }}
            />
          ))}
        </JustifyBetween>
        {currentTab === 'inProgress' && <InProgressEvent />}
        {currentTab === 'finished' && <FinishedEvent />}
      </Column>
    </>
  )
}
