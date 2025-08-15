'use client'

import { useLayoutEffect, useRef } from 'react'
import { Column } from '../Layout'
import { cn } from '../../utils/cn'
import { Text } from '../Text'
import '../../styles.css'

type Props = {
  value: string
  setValue: (value: React.SetStateAction<string>) => void
  placeholder?: string
  maxLength?: number
  maxHeight?: number
  className?: string
}

/**
 * Textarea 컴포넌트
 *
 * 내용에 맞춰 높이가 자동 조절되는 입력창.
 * 커서 색상, 두께, 최대 높이, 최대 글자 수, placeholder 등 조절 가능.
 *
 * @param value - 입력값 상태
 * @param setValue - 입력값 변경 함수
 * @param [placeholder=내용을 입력해주세요] - 입력창 플레이스홀더 텍스트
 * @param [maxLength=1000] - 입력 가능한 최대 글자 수
 * @param [maxHeight=300] - 자동 높이 조절 시 최대 높이(px)
 * @param [className] - 추가 Tailwind 클래스
 */
export const Textarea = ({
  value,
  setValue,
  placeholder = '내용을 입력해주세요',
  maxHeight = 300,
  maxLength = 1000,
  className,
}: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useLayoutEffect(() => {
    textareaRef.current?.focus()
  }, [])

  // 내용에 맞춰 자동 높이 조절
  useLayoutEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      const newHeight = Math.min(textareaRef.current.scrollHeight, maxHeight)
      textareaRef.current.style.height = `${newHeight}px`
    }
  }, [value, maxHeight])

  return (
    <Column>
      <textarea
        ref={textareaRef}
        value={value}
        maxLength={maxLength}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'ui:pt-2.5 ui:px-0.5',
          'ui:border-t ui:border-gray-100',
          'ui:outline-none',
          'ui:text-sm ui:font-regular',
          'ui:text-gray-500',
          'ui:placeholder:text-gray-200',
          'ui:caret-blue',
          'ui:resize-none',
          'ui:h-fit',
          `ui:max-h-[${maxHeight}px]`,
          'scrollbar-hide',
          className,
        )}
      />
      {value.length > 0 && (
        <Text
          fontSize={'xs'}
          fontWeight={'semibold'}
          className={'ui:ml-auto ui:text-gray-200'}
        >
          {maxLength - value.length}
        </Text>
      )}
    </Column>
  )
}
