'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCampusStore } from '@/_store/campus'
import { CampusType, CAMPUS_LIST } from '@/_constants/campus'

const normalizeCampus = (value: string | null): CampusType | null => {
  if (!value) return null
  const upperValue = value.toUpperCase() as CampusType
  return CAMPUS_LIST.includes(upperValue) ? upperValue : null
}

export const CampusInitializer = () => {
  const searchParams = useSearchParams()
  const setCampus = useCampusStore((state) => state.setCampus)
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return

    const paramCampus = searchParams.get('campus')
    const storedCampus = localStorage.getItem('campus')
    let targetCampus: CampusType = 'SINGWAN'

    const normalizedParamCampus = normalizeCampus(paramCampus)
    const normalizedStoredCampus = normalizeCampus(storedCampus)

    if (normalizedParamCampus) {
      targetCampus = normalizedParamCampus
      localStorage.setItem('campus', targetCampus)
    } else if (normalizedStoredCampus) {
      targetCampus = normalizedStoredCampus
    }

    setCampus(targetCampus)
    initialized.current = true
  }, [searchParams, setCampus])

  return null
}
