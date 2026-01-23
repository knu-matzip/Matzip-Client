'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCampusStore } from '@/_store/campus'
import { CampusType, CAMPUS_LIST } from '@/_constants/campus'

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

    const paramCampus = searchParams.get('campus')
    const storedCampus = localStorage.getItem('campus')
    let targetCampus: CampusType = 'SINGWAN'

    if (isValidCampus(paramCampus)) {
      targetCampus = paramCampus
      localStorage.setItem('campus', targetCampus)
    } else if (isValidCampus(storedCampus)) {
      targetCampus = storedCampus
    }

    setCampus(targetCampus)
    initialized.current = true
  }, [searchParams, setCampus])

  return null
}
