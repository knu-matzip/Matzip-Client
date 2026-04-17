import { type CampusType, CAMPUS_LIST } from '@/_constants/campus'
import { CampusButton } from './CampusButton'
import { Column } from '@repo/ui/components/Layout'

type Props = {
  value: CampusType
  onChange: (campus: CampusType) => void
}

/**
 * 지도에서 여러 캠퍼스 위치 중 하나를 선택할 수 있는 버튼 목록을 표시합니다.
 * 사용자가 버튼을 클릭하면 해당 캠퍼스가 활성화되고, 지도 중심이 해당 캠퍼스 위치로 이동합니다.
 */
export const CampusSelector = ({ value, onChange }: Props) => {
  const handleButtonClick = (campus: CampusType) => {
    onChange(campus)
  }

  return (
    <Column className={'z-1 absolute right-4 top-20 gap-2.5'}>
      {CAMPUS_LIST.map((campus) => (
        <CampusButton
          key={campus}
          campus={campus}
          isActive={campus === value}
          onClick={() => handleButtonClick(campus)}
        />
      ))}
    </Column>
  )
}
