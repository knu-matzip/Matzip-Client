// 메뉴
import { Asian } from './assets/icons/menu/asian'
import { Bunsik } from './assets/icons/menu/bunsik'
import { Burger } from './assets/icons/menu/burger'
import { Cafe } from './assets/icons/menu/cafe'
import { Chicken } from './assets/icons/menu/chicken'
import { Chinese } from './assets/icons/menu/chinese'
import { Japanese } from './assets/icons/menu/japanese'
import { Korean } from './assets/icons/menu/korean'
import { Lunchbox } from './assets/icons/menu/lunchbox'
import { Meat } from './assets/icons/menu/meat'
import { Mexican } from './assets/icons/menu/mexican'
import { Pizza } from './assets/icons/menu/pizza'
import { Salad } from './assets/icons/menu/salad'
import { Soup } from './assets/icons/menu/soup'
import { Western } from './assets/icons/menu/western'
// 네비게이션
import { Home } from './assets/icons/navigation/home'
import { Map } from './assets/icons/navigation/map'
import { CirclePlus } from './assets/icons/navigation/circlePlus'
import { Heart as NavHeart } from './assets/icons/navigation/heart'
import { User as NavUSer } from './assets/icons/navigation/user'
// 태그
import { FingerUp } from './assets/icons/tag/fingerUp'
import { Calculator } from './assets/icons/tag/calculator'
import { BlingBling } from './assets/icons/tag/blingBling'
import { Waiter } from './assets/icons/tag/waiter'
// 헤더
import { MarkerWithMap } from './assets/icons/header/markerWithMap'
import { Logo } from './assets/icons/header/logo'
import { Heart as HeaderHeart } from './assets/icons/header/heart'
import { User as HeaderUser } from './assets/icons/header/user'
import { ShakingHeart } from './assets/icons/header/shakingHeart'

import { ArrowLeft } from './assets/icons/arrowLeft'
import { ArrowRight } from './assets/icons/arrowRight'
import { Search } from './assets/icons/search'
import { FireHeart } from './assets/icons/fireHeart'
import { Fire } from './assets/icons/fire'
import { Marker } from './assets/icons/marker'
import { Pin } from './assets/icons/pin'
import { Note } from './assets/icons/note'
import { Smile } from './assets/icons/smile'
import { Cry } from './assets/icons/cry'
import { KakaoLogo } from './assets/icons/kakaoLogo'
import { Crosshairs } from './assets/icons/crosshairs'
import { DoubleHeart } from './assets/icons/doubleHeart'

export const iconMap = {
  // 메뉴
  asian: Asian, // 아시안
  bunsik: Bunsik, // 분식
  burger: Burger, // 햄버거
  cafe: Cafe, // 카페
  chicken: Chicken, // 치킨
  chinese: Chinese, // 중식
  japanese: Japanese, // 일식
  korean: Korean, // 한식
  lunchbox: Lunchbox, // 도시락
  meat: Meat, // 고기·구이
  mexican: Mexican, // 멕시칸
  pizza: Pizza, // 피자
  salad: Salad, // 샐러드
  soup: Soup, // 찜·탕
  western: Western, // 양식

  // 네비게이션
  home: Home,
  map: Map,
  circlePlus: CirclePlus,
  navHeart: NavHeart,
  navUser: NavUSer,

  // 태그
  fingerUp: FingerUp,
  calculator: Calculator,
  blingBling: BlingBling,
  waiter: Waiter,

  // 헤더
  logo: Logo,
  markerWithMap: MarkerWithMap,
  headerHeart: HeaderHeart,
  headerUser: HeaderUser,
  shakingHeart: ShakingHeart,

  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  search: Search,
  fireHeart: FireHeart,
  fire: Fire,
  marker: Marker,
  pin: Pin,
  note: Note,
  smile: Smile,
  cry: Cry,
  kakaoLogo: KakaoLogo,
  crosshairs: Crosshairs,
  doubleHeart: DoubleHeart,
}

export type IconType = keyof typeof iconMap
export const IconList = Object.keys(iconMap) as IconType[]
