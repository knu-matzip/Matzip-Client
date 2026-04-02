'use client'

import { useState } from 'react'
import { useCampusStore } from '@/_store/campus'
import { type CampusType, CAMPUS_LIST } from '@/_constants/campus'
import { CampusButton } from './CampusButton'
import { Column } from '@repo/ui/components/Layout'

/**
 * Next.js 서버 컴포넌트 경계에서 함수를 전달받기 위해
 * props 이름을 '...Action'으로 끝나는 형식으로 수정합니다.
 */
type Props = {
  onChangeAction: (campus: CampusType) => void
}

/**
 * 지도에서 여러 캠퍼스 위치 중 하나를 선택할 수 있는 버튼 목록을 표시합니다.
 * 사용자가 버튼을 클릭하면 해당 캠퍼스가 활성화되고, 지도 중심이 해당 캠퍼스 위치로 이동합니다.
 */
export const CampusSelector = ({ onChangeAction }: Props) => {
  // Todo: 캠퍼스도 value prop으로 받을 지 고려
  const { campus: initCampus } = useCampusStore()
  const [activeCampus, setActiveCampus] = useState<CampusType>(initCampus)

  const handleButtonClick = (campus: CampusType) => {
    onChangeAction(campus)
    setActiveCampus(campus)
  }

  return (
    <Column className={'z-1 absolute right-4 top-20 gap-2.5'}>
      {CAMPUS_LIST.map((campus) => (
        <CampusButton
          key={campus}
          campus={campus}
          isActive={campus === activeCampus}
          onClick={() => handleButtonClick(campus)}
        />
      ))}
    </Column>
  )
}
