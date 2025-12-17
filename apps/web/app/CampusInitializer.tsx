'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCampusStore } from '@/_store/campus'
import { CampusType, CAMPUS_LIST } from '@/_constants/campus' // CAMPUS_LIST가 있다고 가정

const isValidCampus = (value: string | null): value is CampusType => {
  if (!value) return false
  return (CAMPUS_LIST as readonly string[]).includes(value)
}

export const CampusInitializer = () => {
  const searchParams = useSearchParams()
  const setCampus = useCampusStore((state) => state.setCampus)
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return

    const param = searchParams.get('campus')

    // 유효한 값이면 그걸 쓰고, 아니면 기본값 'SINGWAN'
    const targetCampus: CampusType = isValidCampus(param) ? param : 'SINGWAN'

    setCampus(targetCampus)
    initialized.current = true
  }, [searchParams, setCampus])

  return null
}
