"use client";

import { useState } from "react";
import { Sparkles, Share2, RotateCcw } from "lucide-react";

// ---------- 시드 생성 (같은 문장 = 같은 결과) ----------
function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h >>> 0;
}

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const CATEGORIES = [
  {
    id: "impossible",
    label: "불가능계",
    range: [0.0000001, 0.0009],
    weight: 6,
    keywords: [
      "날", "비행", "코끼리", "지구", "멈추", "우주", "시간여행", "용", "유니콘",
      "불가능", "좀비", "부활", "하늘을", "공룡", "투명인간", "순간이동", "타임머신",
      "거인", "마법", "축소", "변신", "외계인", "귀신", "환생", "빛보다",
      "말하다", "날개", "물위를 걷다", "얼음이 되다", "돌이 되다", "바다를 가르다",
      "산을 옮기다", "달에 가다", "화성", "블랙홀", "차원이동", "텔레파시",
      "초능력", "슈퍼파워", "영생", "불로불사", "타임슬립", "평행세계",
      "유령", "괴물", "괴수", "중력을 거스르다", "벽을 통과",
      "인어", "드래곤", "마녀", "저주에 걸리다", "동물이 말을 하다",
      "시간을 멈추다", "미래를 보다", "과거로 가다", "복제인간",
      "로봇이 감정을", "AI가 인간이 되다", "생명을 창조", "영혼이 바뀌다",
      "몸이 바뀌다", "하늘에서 떨어지지 않다", "물이 위로 흐르다",
      "그림자가 없다", "거울 속으로", "또 다른 나",
      "고양이가 개가 되다", "달을 손으로 잡다", "번개를 맞고 초능력",
      "손에서 불이 나오다", "물속에서 숨을 쉬다", "구름 위를 걷다",
      "지구가 멈추다", "태양이 사라지다", "시간을 되돌리다",
      "무한동력", "영원히 살다", "한 번에 두 곳에 있다", "생각만으로 물건을 움직이다",
      "죽었다가 살아나다", "다른 행성에서 태어나다", "그림에서 나오다",
      "만화 캐릭터가 실제로", "게임 캐릭터가 현실로", "꿈속에서 영원히",
      "시간이 거꾸로 가다", "노화가 멈추다", "완전히 투명해지다",
      "동시에 여러 곳에 존재", "생각을 읽다", "미래가 정해져 있다",
      "우주의 끝에 가다", "빅뱅을 목격하다", "공기 없이 숨쉬다",
      "AI가 스스로 생각하다", "로봇이 반란", "핸드폰이 스스로 켜지다",
      "인터넷 없이 검색되다", "배터리가 무한", "충전 없이 영원히",
      "생각만으로 앱을 켜다", "화면을 만지지 않고 조작", "홀로그램이 실체가",
      "태풍을 멈추다", "지진을 막다", "화산을 잠재우다", "해일을 되돌리다",
      "번개를 손으로 잡다", "폭풍을 가르다", "쓰나미를 멈추다",
      "비행기가 날개 없이 날다", "잠수함이 하늘을 날다",
      "게임 캐릭터가 나를 알아보다", "NPC가 살아있다", "버그로 신이 되다",
      "해킹으로 시간을 조작", "서버가 다운되지 않다", "핑이 0이 되다",
      "완벽한 판정승", "심판 없이 무패", "치트 없이 만렙 즉시 달성",
      "밥을 안 먹고 100년을 살다", "물 없이 한 달을 버티다",
      "숨을 참고 하루종일", "잠을 안 자고 평생", "빛의 속도로 걷다",
      "생각으로 미래를 바꾸다", "손대지 않고 문을 열다",
      "자동차가 스스로 날다", "주차장이 무한대", "기름 없이 영원히 달리다",
      "미세먼지가 완전히 없어지다", "폭염이 하루아침에 사라지다",
      "한파가 여름에 오다", "눈이 사막에 쌓이다",
      "술을 안 마시고 취하다", "운동 안 하고 근육이 생기다",
      "공부 안 하고 1등 하다", "돈 없이 부자가 되다",
      "노력 없이 완벽해지다", "잠만 자고 시험을 보다",
      "축구공이 스스로 골대로", "농구공이 저절로 들어가다",
      "공이 벽을 뚫다", "라켓 없이 서브를 넣다", "골프공이 홀로 걸어가다",
      "황사가 초록색이다", "비가 위로 떨어지다", "눈이 뜨겁다",
      "번호판 없이 운전하다", "면허 없이 완벽 주행", "브레이크 없이 안전하게",
      "조회수가 무한대", "구독자가 하루에 억 단위로", "댓글이 우주만큼",
      "헌혈로 몸이 두 배로", "기부금이 저절로 늘어나다",
    ],
    reasons: [
      "물리 법칙이 명백히 반대편에 서 있습니다.",
      "생물학적 구조상 애초에 설계되지 않은 동작입니다.",
      "우주가 이 사건을 위해 규칙을 바꿔야 합니다.",
      "역사상 단 한 번도 관측된 적이 없는 유형의 사건입니다.",
    ],
  },
  {
    id: "rare",
    label: "극희귀계",
    range: [0.001, 3],
    weight: 12,
    keywords: [
      "로또", "1등", "벼락", "대박", "당첨", "만나다", "연예인", "우연히",
      "기적", "인생역전", "장학금", "전액", "경품", "유성", "천재지변",
      "짝사랑이", "복권", "역전승", "우주비행사", "아이돌", "유명해지다",
      "바이럴", "떡상", "역주행", "1위", "노벨상", "올림픽 금메달",
      "월드컵", "억만장자", "동시당첨", "쌍둥이를 낳다", "희귀병",
      "운명적", "첫눈에 반하다", "국가대표", "천재로 태어나다",
      "만렙 뽑기", "레전드 아이템", "SSR", "가챠 대박", "한정판을 구하다",
      "콘서트 티켓팅 성공", "1픽", "명당 자리", "사인을 받다",
      "무대에 서다", "스카우트 되다", "발탁되다", "우주에 가다",
      "타임캡슐을 찾다", "숨겨진 유산", "보물을 찾다",
      "건물주가 되다", "주식이 10배", "코인 대박", "퇴사하고 성공",
      "책이 베스트셀러", "영화가 대박나다", "발명품이 팔리다",
      "특허가 통과되다", "우연히 재회하다", "쌍둥이 아빠 둘 다",
      "같은 날 태어난 사람을 만나다", "번호가 겹치다", "환불이 두 배로",
      "프로야구 선수가 되다", "메이저리그", "국가대표로 뽑히다",
      "드래프트 1순위", "우승반지", "MVP를 받다", "신인왕",
      "아이돌 오디션 합격", "데뷔하다", "빌보드 1위", "그래미상",
      "한 경기에서 만루홈런", "노히트노런", "퍼펙트게임",
      "팔로워가 백만", "게시물이 떡상", "실시간 검색어 1위",
      "인플루언서가 되다", "협찬을 받다", "브랜드 모델이 되다",
      "영화제 수상", "대상을 받다", "전국 1등", "만점을 받다",
      "다이아몬드 랭크 달성", "챌린저 티어", "1티어 아이템 획득",
      "비행기 좌석이 업그레이드", "1등석에 앉다", "무료로 여행가다",
      "여권을 잃어버렸는데 찾다", "공모전에서 대상", "특별상을 받다",
      "희귀 카드가 나오다", "한정판이 재입고", "역대급 세일에 성공",
      "청약에 당첨되다", "로얄층에 당첨", "아파트 분양 당첨",
      "공연 앙코르에 지명되다", "관객 이벤트에 뽑히다", "몰래카메라 주인공",
      "스카우트 제의를 받다", "캐스팅되다", "우연히 오디션을 보다",
      "무료나눔에 당첨", "선착순 이벤트 성공", "1초 만에 매진 전에 구매",
      "리뷰 이벤트 당첨", "댓글 이벤트 당첨", "생일선물로 대박 아이템",
      "짝사랑 상대가 먼저 고백", "우연히 좋아하는 연예인을 만나다",
      "홀인원을 하다", "만루홈런을 치다", "해트트릭을 하다",
      "그랜드슬램을 달성", "무결점 경기를 하다", "역대 최고 기록",
      "부동산으로 대박나다", "경매로 싸게 낙찰받다",
      "토익 만점", "토플 만점", "만점을 맞다", "전과목 A+",
      "장학생으로 유학", "전액 장학금 유학", "회사에서 특별 보너스",
      "우연히 사기를 피하다", "복권을 주웠는데 당첨",
      "풀코스 마라톤 서브3", "축구 데뷔골", "농구 버저비터",
      "배구 퍼펙트 리시브", "테니스 그랜드슬램", "F1 우승",
      "데이팅앱에서 이상형을 만나다", "세뱃돈을 100만원 받다",
      "오버워치 6인 골드메달", "롤 펜타킬", "배그 치킨 20킬",
      "피파 무패행진", "결혼기념일에 서프라이즈 대성공",
      "임신테스트기 바로 성공", "첫 시도에 만점",
      "롤드컵 우승", "스타크래프트 그랜드파이널 우승", "프로게이머로 데뷔",
      "유튜브 영상이 역주행", "구독자 100만 달성", "영상이 하루에 100만뷰",
      "프로포즈가 완벽하게 성공", "이사 견적이 절반",
    ],
    reasons: [
      "이론적으로는 가능하지만 표본이 극히 적은 사건입니다.",
      "매년 전국에서 손에 꼽을 정도로만 발생하는 빈도입니다.",
      "발생 조건이 여러 겹으로 겹쳐야 하는 저확률 사건입니다.",
    ],
  },
  {
    id: "low",
    label: "낮음",
    range: [3, 25],
    weight: 20,
    keywords: [
      "지각", "떨어지다", "실패", "잃어버리다", "까먹다", "늦잠", "넘어지다",
      "체하다", "감기", "지갑", "우산", "탈락", "혼나다", "망치다",
      "다이어트 실패", "야식", "미루다", "지연", "결석", "과속", "딱지",
      "층간소음", "물건을 깨다", "지퍼가 고장", "핸드폰을 떨어뜨리다",
      "와이파이가 끊기다", "약속을 잊다", "차가 막히다", "배터리가 나가다",
      "감기에 걸리다", "발목을 삐다", "코피가 나다", "숙제를 안 하다",
      "게임에서 지다", "패널티", "벌금", "과제 마감을 놓치다",
      "면접에서 떨다", "말실수", "오타를 내다", "메일을 잘못 보내다",
      "알람을 못 듣다", "버스를 놓치다", "지하철을 놓치다", "택배가 늦다",
      "주문을 잘못하다", "길을 잃다", "단추가 떨어지다", "신발이 벗겨지다",
      "휴대폰 액정이 깨지다", "이어폰을 잃어버리다", "충전기를 안 챙기다",
      "지하철에서 졸다 지나치다", "우유를 쏟다", "옷에 커피를 흘리다",
      "비밀번호를 까먹다", "카드를 안 챙기다", "회의에 늦다",
      "메시지를 안 읽다", "답장을 늦게 하다", "우산을 안 챙기다",
      "차키를 잃어버리다", "주차 딱지를 떼다", "택시를 잘못 타다",
      "면접에서 떨어지다", "시험을 망치다", "발표를 실수하다",
      "게임에서 짐", "랭크가 떨어지다", "PC방에서 지다", "롤 지다",
      "야식을 먹고 후회", "다이어트 중 폭식", "운동을 빠지다",
      "약속에 늦다", "번호를 잘못 누르다", "문자를 잘못 보내다",
      "삐끗하다", "체육대회에서 지다", "가위바위보에서 지다",
      "요리를 태우다", "간을 잘못 맞추다", "빨래를 잘못 넣다",
      "옷이 줄어들다", "화분을 죽이다", "식물이 시들다",
      "와이파이 비번을 까먹다", "앱이 튕기다", "화면이 깨지다",
      "택배가 파손되다", "환불이 늦어지다", "예약이 취소되다",
      "비행기가 연착되다", "비행기가 결항되다", "기차를 놓치다",
      "대출이 거절되다", "카드값이 많이 나오다", "세일을 놓치다",
      "품절되다", "환승을 놓치다", "여행 계획이 취소되다",
      "짐을 잃어버리다", "우천으로 경기가 취소되다",
      "해고되다", "권고사직", "야근하다", "회식에 불려가다",
      "악기 연습을 게을리하다", "그림이 망하다", "발표 자료를 날리다",
      "청약에서 떨어지다", "분양에서 떨어지다", "면접 시간에 늦다",
      "쿠폰을 놓치다", "장바구니에서 품절", "결제가 안 되다",
      "배송이 잘못 오다", "사이즈가 안 맞다", "색이 다르게 오다",
      "리뷰가 나쁘다", "환불이 거절되다", "교환이 안 되다",
      "차가 고장나다", "타이어가 터지다", "접촉사고가 나다",
      "주차 위반에 걸리다", "과태료를 내다", "범칙금을 물다",
      "알바를 잘리다", "손님한테 컴플레인 받다", "실수로 주문을 두 번",
      "게임 결제 실수", "환불이 안 되다", "숙취로 고생하다",
      "술자리에서 실수하다", "필름이 끊기다", "운동을 빠지다",
      "헬스장 등록하고 안 가다", "다치다", "근육통이 오다",
      "온라인 사기를 당하다", "보이스피싱을 당하다",
      "알람을 못 듣고 늦잠", "회의에서 발표를 망치다", "말을 더듬다",
      "데이팅앱에서 매칭이 안 되다", "소개팅이 취소되다",
      "자취방 계약이 깨지다", "독립하고 요리를 태우다",
      "전세사기를 당하다", "필기시험에서 떨어지다", "실기시험에서 떨어지다",
      "서버 점검에 걸리다", "앱 업데이트 후 오류", "롤 펜타킬을 당하다",
      "배그에서 1킬도 못하다", "폭우에 옷이 젖다", "폭설로 길이 막히다",
      "이사 견적이 비싸다", "대출이 반려되다", "전세대출이 안 나오다",
      "프로포즈가 실패하다", "조회수가 안 나오다", "구독자가 줄다",
      "강아지 미용을 실패하다", "고양이가 물다", "반려동물이 아프다",
    ],
    reasons: [
      "발생하긴 하지만 대부분의 경우엔 피해가는 케이스입니다.",
      "평소 습관이 이 결과를 어느 정도 막아주고 있습니다.",
      "가능성은 있으나 조건이 딱 맞아야 일어납니다.",
    ],
  },
  {
    id: "mid",
    label: "반반",
    range: [30, 65],
    weight: 24,
    keywords: [
      "비", "선택", "고민", "소개팅", "연애", "고백", "이사", "이직",
      "궁합", "재회", "환승", "썸", "다시 만나다", "화해", "이별",
      "결혼", "동업", "창업", "투자", "베팅", "가위바위보", "동전",
      "면접", "합격여부", "당첨여부", "날씨", "눈이 오다", "경기 결과",
      "우승", "재수", "삼수", "전학", "이혼", "화가 나다", "연락이 오다",
      "답장이 오다", "다시 사귀다", "친구가 되다", "룸메이트", "동거",
      "육아", "임신", "출산", "입양", "이민", "귀국", "전근", "발령",
      "경기에서 이기다", "시합", "경매", "복불복", "사다리타기",
      "주식이 오르다", "환율이 오르다", "집값이 오르다", "면허를 따다",
      "자격증을 따다", "인턴이 되다", "정규직이 되다", "재입고되다",
      "재고가 있다", "품절되기 전에 사다", "예약에 성공하다",
      "당첨자로 뽑히다", "추첨에서 뽑히다", "매칭이 되다",
      "군대에 가다", "입대", "훈련소", "휴가를 나오다", "전역하다",
      "수능을 보다", "재시험", "면허시험", "운전면허 실기",
      "야구 경기 결과", "우천으로 취소", "연장전", "역전하다",
      "이적하다", "트레이드되다", "은퇴하다", "복귀하다",
      "정시로 합격", "수시로 합격", "편입하다", "재입학",
      "결혼식을 하다", "청첩장을 받다", "돌잔치", "장례를 치르다",
      "이사갈 집을 구하다", "전세를 구하다", "매물이 나오다",
      "환승연애", "재결합", "권태기를 겪다",
      "왕따를 당하다", "전학을 가다", "수행평가를 잘 보다",
      "헤어지다", "헤어질", "이별하다", "권태기",
      "짝사랑하다", "고백을 받다", "먼저 연락하다", "답을 기다리다",
      "쿠폰이 오다", "할인코드가 오다", "이벤트에 참여하다",
      "경쟁률이 높다", "추첨하다", "제비뽑기",
      "부동산을 팔다", "집이 팔리다", "매매가 성사되다",
      "온라인강의를 완강하다", "자격증 시험 일정", "성적이 오르다",
      "미세먼지가 심하다", "폭염이 오다", "한파가 오다",
      "열애설이 나다", "스캔들이 터지다", "이혼설이 나다",
      "야근을 하다", "워라밸을 지키다", "회식에 참석하다",
      "반려동물이 병원에 가다", "동물병원비가 나오다",
      "축구 경기 결과", "농구 경기 결과", "배구 경기 결과",
      "골프 라운딩", "테니스 경기", "데이팅앱에서 만나다",
      "자취를 시작하다", "독립하다", "세뱃돈을 받다",
      "명절 선물을 받다", "회의가 길어지다",
      "운전면허 필기시험", "과외를 구하다", "학원을 다니다",
      "건강검진 결과가 나오다", "임신테스트를 하다", "결혼기념일을 챙기다",
      "폭우가 오다", "폭설이 오다", "황사가 오다",
      "이사 견적을 받다", "전세대출을 받다", "디딤돌대출을 받다",
      "프로포즈를 하다", "유튜브를 시작하다", "카페를 창업하다",
      "헌혈을 하다", "기부를 하다", "반려동물 미용을 하다",
      "반려동물을 입양하다", "강아지를 키우다", "고양이가 따르다",
      "명절에 만나다", "제사를 지내다", "가족 모임을 하다",
      "악기를 배우다", "그림을 배우다", "취미를 시작하다",
    ],
    reasons: [
      "여러 변수가 서로 균형을 이루고 있는 상황입니다.",
      "결과를 가를 요인이 아직 정해지지 않았습니다.",
      "동전 던지기에 약간의 힌트가 더해진 정도입니다.",
    ],
  },
  {
    id: "high",
    label: "높음",
    range: [65, 96],
    weight: 22,
    keywords: [
      "성공", "합격", "맞다", "이기다", "해결", "괜찮다", "완료", "끝내다",
      "적응", "극복", "나아지다", "취업", "졸업", "승진", "완치",
      "친해지다", "화가 풀리다", "정리하다", "청산", "빚을 갚다",
      "살이 빠지다", "습관이 되다", "익숙해지다", "적립", "환불받다",
      "재계약", "연장", "무사히", "안전하게 도착", "완주하다",
      "복구되다", "치유되다", "화해하다", "정착하다", "안정되다",
      "받아들여지다", "허락받다", "승인되다", "통과하다", "인정받다",
      "제시간에 도착", "무사고", "정상 작동", "복원되다",
      "환불받다", "교환받다", "AS를 받다", "보증기간 안에",
      "재발급받다", "무료로 받다", "업그레이드되다", "할인받다",
      "예약이 확정되다", "배송이 오다", "답이 오다", "연락이 닿다",
      "무사히 끝나다", "잘 마치다", "이해받다",
      "전역하고 적응하다", "제대하다", "휴가를 받다", "부대에 복귀",
      "다시 걷다", "회복하다", "재활에 성공", "수술이 잘되다",
      "면역이 생기다", "예방접종을 맞다", "건강검진 통과",
      "체력이 좋아지다", "살이 붙다", "키가 크다",
      "화분이 자라다", "식물이 살아나다", "얼룩이 지워지다",
      "냄새가 빠지다", "곰팡이가 없어지다", "벌레가 없어지다",
      "고장이 고쳐지다", "부품을 구하다", "정상화되다",
      "재고가 들어오다", "품절이 풀리다",
      "비행기가 제시간에 뜨다", "짐을 되찾다", "환불이 완료되다",
      "여행이 무사히 끝나다", "비자가 통과되다", "입국심사를 통과",
      "요리가 맛있게 되다", "레시피대로 되다", "화분이 꽃을 피우다",
      "재취업하다", "재입사하다", "강아지가 재롱을 부리다",
      "고양이가 애교를 부리다", "가족과 화해하다", "명절을 잘 보내다",
      "연습한 만큼 실력이 오르다", "그림이 완성되다", "곡을 완주하다",
      "휴가 나오다", "외박을 나가다", "포상휴가", "정기휴가",
      "쿠폰이 적용되다", "할인이 적용되다", "포인트가 쌓이다",
      "적립금을 받다", "이벤트에 당첨되다", "선물을 받다",
      "차가 정비되다", "고장이 수리되다", "보험처리가 되다",
      "합의가 잘 되다", "성적이 잘 나오다", "강의를 완강하다",
      "숙취가 풀리다", "근육통이 낫다", "다이어트 유지되다",
      "사기를 눈치채다", "환불받고 해결되다",
      "발표를 잘 마치다", "회의가 순조롭다", "알람에 잘 일어나다",
      "매칭에 성공하다", "소개팅이 잘되다", "자취방을 구하다",
      "필기시험에 합격하다", "실기시험에 합격하다", "건강검진 결과가 좋다",
      "서버가 정상화되다", "업데이트가 잘 되다",
      "이사가 잘 끝나다", "대출이 승인나다", "프로포즈가 받아들여지다",
      "구독자가 늘다", "조회수가 오르다", "카페가 잘 되다",
    ],
    reasons: [
      "지금까지의 흐름이 이 결과를 강하게 가리키고 있습니다.",
      "대부분의 유사 사례에서 이런 결과가 나왔습니다.",
      "필요한 조건이 이미 거의 다 갖춰진 상태입니다.",
    ],
  },
  {
    id: "certain",
    label: "거의확실",
    range: [96, 99.9999],
    weight: 16,
    keywords: [
      "확실", "당연", "무조건", "반드시", "항상", "매일", "해가 뜨다",
      "숨을 쉬다", "내일이 오다", "시간이 가다", "나이를 먹는", "계절이 바뀌다",
      "밤이 오다", "물이 아래로 흐르다", "겨울이 오다", "봄이 오다",
      "해가 지다", "달이 뜨다", "심장이 뛰다", "숨쉬다", "늙다", "잠이 오다",
      "계절이 지나가다", "시계가 돌다", "물이 얼다", "불이 뜨겁다",
      "얼음이 녹다", "해가 뜨고 지다", "월요일이 오다", "생일이 오다",
      "새해가 오다", "밥을 먹으면 배가 부르다", "졸리면 잠이 오다",
      "월급날이 오다", "주말이 오다", "방학이 오다", "생리가 오다",
      "배고프면 먹고 싶다", "추우면 떨리다", "더우면 땀이 나다",
      "다치면 아프다", "굶으면 배고프다", "안 자면 피곤하다",
      "뛰면 숨차다", "매워면 맵다", "차가우면 시리다", "높은 곳에서 떨어지면 아프다",
      "불에 데면 뜨겁다", "물에 젖으면 축축하다", "밤이 지나면 아침이 오다",
      "봄이 지나면 여름이 오다", "월요일이 지나면 화요일",
      "먹으면 배부르다", "달리면 숨차다", "울면 눈물이 나다",
      "웃으면 기분이 좋다", "자면 꿈을 꾸다", "씻으면 깨끗해지다",
      "청소하면 깨끗해지다", "물을 마시면 목이 안 마르다",
      "해가 없으면 어둡다", "비가 오면 젖다", "바람이 불면 흔들리다",
      "겨울이면 춥다", "여름이면 덥다", "밤이면 어둡다",
      "배고프면 짜증나다", "졸리면 하품이 나다", "슬프면 눈물이 나다",
      "웃기면 웃음이 나다", "명절이 오면 가족이 모이다", "연습하면 실력이 오르다",
      "해가 뜰", "해가 지는", "숨을 쉴", "숨쉴", "눈을 감으면 어둡다",
      "나이가 들다", "시간이 지나다", "봄이 오는", "겨울이 오는",
      "해가 뜨는", "달이 지는", "밤이 깊어지다", "아침이 밝다",
      "시간이 흐르다", "계절이 오다", "나이를 먹는",
      "겨울이 지나면 봄", "밤이 지나면 낮", "숨을 쉬면 살다",
      "먹으면 소화되다", "자면 개운해지다",
      "술을 마시면 취하다", "운동하면 힘들다", "굶으면 살이 빠지다",
      "일하면 지치다", "쉬면 회복되다",
      "명절이 지나면 일상으로", "주말이 지나면 월요일", "먹으면 살이 찌다",
      "비가 오면 습해지다", "눈이 오면 춥다", "바람이 불면 춥다",
      "돈을 쓰면 줄다", "일하면 돈을 받다", "먹으면 배가 부르다",
    ],
    reasons: [
      "지금까지 예외가 거의 없었던 사건입니다.",
      "이 결과를 막을 만한 변수가 거의 존재하지 않습니다.",
      "자연스러운 흐름상 이렇게 되지 않기가 더 어렵습니다.",
    ],
  },
];

const SENSITIVE_KEYWORDS = [
  "죽을", "죽음", "죽고싶", "자살", "극단적 선택", "극단적선택",
  "목숨", "자해", "사라지고싶", "죽는", "죽어버리", "죽여줘",
  "살기싫", "그만살고싶", "생을 마감", "목을 매다", "투신",
];

function isSensitive(text) {
  const lower = text.toLowerCase();
  return SENSITIVE_KEYWORDS.some((k) => lower.includes(k));
}

function pickCategory(text, rand) {
  const lower = text.toLowerCase();
  const matched = CATEGORIES.find((cat) =>
    cat.keywords.some((k) => lower.includes(k))
  );
  if (matched) return matched;

  const commonPool = CATEGORIES.filter((c) =>
    ["low", "mid", "high"].includes(c.id)
  );
  const totalWeight = commonPool.reduce((sum, c) => sum + c.weight, 0);
  let r = rand() * totalWeight;
  for (const cat of commonPool) {
    if (r < cat.weight) return cat;
    r -= cat.weight;
  }
  return commonPool[1];
}

function computeResult(text) {
  const seed = hashString(text.trim());
  const rand = mulberry32(seed);
  const category = pickCategory(text, rand);
  const [min, max] = category.range;
  const value = min + rand() * (max - min);

  let decimals = 2;
  if (value < 0.001) decimals = 7;
  else if (value < 0.1) decimals = 4;
  else if (value < 5) decimals = 2;
  else decimals = 1;

  const reasonIdx = Math.floor(rand() * category.reasons.length);
  const reason = category.reasons[reasonIdx];

  return { percent: value.toFixed(decimals), category, reason };
}

const EXAMPLES = [
  "코끼리가 점프할 확률",
  "내일 지각할 확률",
  "로또 1등에 당첨될 확률",
  "짝사랑이 이루어질 확률",
  "이번 시험에 합격할 확률",
];

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);

  const draw = (text) => {
    if (isSensitive(text)) {
      setQuery(text);
      setResult({ sensitive: true });
      return;
    }
    const r = computeResult(text);
    setQuery(text);
    setResult(r);
    setHistory((prev) => {
      const next = [
        { query: text, percent: r.percent, label: r.category.label },
        ...prev.filter((h) => h.query !== text),
      ];
      return next.slice(0, 5);
    });
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!input.trim()) return;
    draw(input.trim());
  };

  const handleExample = (ex) => {
    setInput(ex);
    draw(ex);
  };

  const handleReset = () => {
    setInput("");
    setResult(null);
    setQuery("");
    setCopied(false);
  };

  const handleCopy = () => {
    const url = `${
      typeof window !== "undefined" ? window.location.origin : ""
    }/?q=${encodeURIComponent(query)}`;
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div style={{ maxWidth: 460, margin: "0 auto", padding: "28px 20px 64px" }}>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            letterSpacing: 1,
            color: "#F2B84B",
            marginBottom: 10,
          }}
        >
          <Sparkles size={14} />
          <span>whatoddly</span>
        </div>
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            fontSize: 30,
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          그 일이 일어날 확률,
          <br />
          숫자로 알려드릴게요
        </h1>
      </div>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <div
          style={{
            display: "flex",
            gap: 8,
            background: "#26264D",
            borderRadius: 14,
            padding: 6,
            border: "1px solid #3A3A6B",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="예: 코끼리가 점프할 확률"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#F6F3ED",
              fontSize: 15,
              padding: "10px 12px",
            }}
          />
          <button
            type="submit"
            style={{
              background: "#F2B84B",
              color: "#1B1B3A",
              border: "none",
              borderRadius: 10,
              padding: "0 18px",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            뽑기
          </button>
        </div>
      </form>

      {!result && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => handleExample(ex)}
              style={{
                background: "transparent",
                border: "1px solid #3A3A6B",
                color: "#B9B6D6",
                borderRadius: 20,
                padding: "6px 12px",
                fontSize: 12.5,
                cursor: "pointer",
              }}
            >
              {ex}
            </button>
          ))}
        </div>
      )}

      {result && result.sensitive && (
        <div
          style={{
            marginTop: 8,
            background: "#F6F3ED",
            color: "#1B1B3A",
            borderRadius: 18,
            padding: "28px 24px",
            boxShadow: "0 20px 40px -20px rgba(0,0,0,0.6)",
          }}
        >
          <p style={{ fontSize: 15, lineHeight: 1.7, margin: "0 0 14px" }}>
            이 질문에는 재미로 %를 매기지 않을게요. 지금 많이 힘든 상황이라면,
            자살예방상담전화 <strong>1393</strong>(24시간, 국번없이)으로
            전화하면 도움을 받을 수 있어요.
          </p>
          <button
            onClick={handleReset}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              background: "#1B1B3A",
              color: "#F6F3ED",
              border: "none",
              borderRadius: 10,
              padding: "10px 14px",
              fontSize: 13.5,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <RotateCcw size={14} /> 다른 질문 해보기
          </button>
        </div>
      )}

      {result && !result.sensitive && (
        <div
          key={query}
          style={{
            marginTop: 8,
            background: "#F6F3ED",
            color: "#1B1B3A",
            borderRadius: 18,
            padding: "28px 24px",
            boxShadow: "0 20px 40px -20px rgba(0,0,0,0.6)",
          }}
        >
          <div style={{ fontSize: 12, letterSpacing: 0.5, color: "#7A7791", marginBottom: 4 }}>
            "{query}"
          </div>
          <div
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 700,
              fontSize: 30,
              lineHeight: 1,
              color: "#F26B5B",
              margin: "6px 0 2px",
            }}
          >
            {result.percent}%
          </div>
          <div
            style={{
              display: "inline-block",
              background: "#EDE9DD",
              color: "#1B1B3A",
              fontSize: 12,
              fontWeight: 700,
              borderRadius: 8,
              padding: "3px 9px",
              marginBottom: 14,
            }}
          >
            {result.category.label}
          </div>
          <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "#3A3752", margin: "0 0 18px" }}>
            {result.reason}
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={handleCopy}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                background: "#1B1B3A",
                color: "#F6F3ED",
                border: "none",
                borderRadius: 10,
                padding: "10px 0",
                fontSize: 13.5,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <Share2 size={14} /> {copied ? "복사됨!" : "링크 복사"}
            </button>
            <button
              onClick={handleReset}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                background: "transparent",
                color: "#7A7791",
                border: "1px solid #DAD5C4",
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 13.5,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <RotateCcw size={14} /> 다시
            </button>
          </div>
        </div>
      )}

      <p style={{ textAlign: "center", fontSize: 11.5, color: "#5E5B85", marginTop: 28 }}>
        같은 문장을 넣으면 항상 같은 결과가 나와요 — 친구랑 비교해보세요
      </p>

      {history.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 12, color: "#7A76A0", marginBottom: 8, textAlign: "center" }}>
            오늘 뽑아본 것들
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {history.map((h) => (
              <button
                key={h.query}
                onClick={() => {
                  setInput(h.query);
                  draw(h.query);
                }}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#24244A",
                  border: "1px solid #34346A",
                  borderRadius: 10,
                  padding: "9px 12px",
                  color: "#D9D6EE",
                  fontSize: 12.5,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    marginRight: 10,
                  }}
                >
                  {h.query}
                </span>
                <span style={{ color: "#F2B84B", fontWeight: 700, flexShrink: 0 }}>
                  {h.percent}%
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 소개 + 카테고리 설명 (SSR로 렌더링되어 크롤러가 읽을 수 있는 콘텐츠) */}
      <div style={{ marginTop: 40, borderTop: "1px solid #2E2E5C", paddingTop: 28 }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, margin: "0 0 10px" }}>
          whatoddly는 어떻게 작동하나요?
        </h2>
        <p style={{ fontSize: 13.5, lineHeight: 1.75, color: "#B9B6D6", margin: "0 0 20px" }}>
          궁금한 상황을 문장으로 입력하면, 그 문장을 고유한 값으로 변환해 여섯 가지
          카테고리 중 하나로 분류하고 그럴듯한 확률을 보여드려요. 같은 문장을 넣으면
          언제나 같은 결과가 나오도록 설계돼서, 친구와 같은 질문을 넣고 결과를
          비교해볼 수 있어요. 이 숫자는 통계적 근거가 있는 예측이 아니라
          재미를 위한 콘텐츠예요. 더 자세한 설명은{" "}
          <a href="/about" style={{ color: "#F2B84B" }}>
            소개 페이지
          </a>
          와{" "}
          <a href="/categories" style={{ color: "#F2B84B" }}>
            카테고리 설명 페이지
          </a>
          에서 확인하실 수 있어요.
        </p>

        <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 10px", color: "#F2B84B" }}>
          확률 카테고리 6가지
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {CATEGORIES.map((c) => (
            <div key={c.id} style={{ fontSize: 12.5, color: "#B9B6D6", lineHeight: 1.6, display: "flex", gap: 8 }}>
              <span style={{ color: "#F6F3ED", fontWeight: 700, flexShrink: 0, width: 62 }}>
                {c.label}
              </span>
              <span>{c.reasons[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
