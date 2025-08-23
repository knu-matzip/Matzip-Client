'use client'

import { useState } from 'react'
import { useCampusStore } from '@/_store/campus'
import {
  type CampusType,
  CAMPUS_LIST,
  CAMPUS_LOCATION,
} from '@/_constants/campus'
import { toLatLng } from '@/map/_utils/toLatLng'
import { CampusButton } from './CampusButton'
import { Column } from '@repo/ui/components/Layout'

/**
 * 지도에서 여러 캠퍼스 위치 중 하나를 선택할 수 있는 버튼 목록을 표시합니다.
 * 사용자가 버튼을 클릭하면 해당 캠퍼스가 활성화되고, 지도 중심이 해당 캠퍼스 위치로 이동합니다.
 *
 * @example
 * ```tsx
 * <CampusButtonBax map={map} />
 * ```
 *
 * @param {object} props
 * @param {naver.maps.Map | null} props.map - 중심 좌표를 이동시킬 네이버 지도 객체 (없으면 동작하지 않음)
 *
 * @returns 캠퍼스 선택 버튼 그룹 UI
 */
export const CampusButtonBax = ({ map }: { map: naver.maps.Map | null }) => {
  const { campus: initCampus } = useCampusStore()
  const [activeCampus, setActiveCampus] = useState<CampusType>(initCampus)

  const onClick = (campus: CampusType) => {
    if (!map) return

    setActiveCampus(campus)
    map.setCenter(toLatLng(CAMPUS_LOCATION[campus]))
  }

  return (
    <Column className={'z-1 absolute right-4 top-20 gap-2.5'}>
      {CAMPUS_LIST.map((campus) => (
        <CampusButton
          key={campus}
          campus={campus}
          isActive={campus === activeCampus}
          onClick={() => onClick(campus)}
        />
      ))}
    </Column>
  )
}
