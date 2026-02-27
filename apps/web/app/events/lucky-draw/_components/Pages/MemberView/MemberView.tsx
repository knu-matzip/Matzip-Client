'use client'

import { Suspense, useState } from 'react'
import { Spinner } from '@heroui/react'
import { Column, JustifyBetween } from '@repo/ui/components/Layout'
import { NavBarItem } from './NavBarItem'
import { InProgressEvent } from './InProgressEvent'
import { FinishedEvent } from './FinishedEvent'

export type StepType = 'inProgress' | 'finished'

const STEP_NAME = {
  inProgress: '진행중인 이벤트',
  finished: '종료된 이벤트',
}
const TABS: StepType[] = ['inProgress', 'finished']

export const MemberView = () => {
  const [currentTab, setCurrentTab] = useState<StepType>('inProgress')

  return (
    <Column className={'h-full min-h-0 p-5'}>
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
      <Suspense fallback={<Spinner className={'m-auto'} />}>
        {currentTab === 'inProgress' && <InProgressEvent />}
      </Suspense>
      <Suspense fallback={<Spinner className={'m-auto'} />}>
        {currentTab === 'finished' && <FinishedEvent />}
      </Suspense>
    </Column>
  )
}
