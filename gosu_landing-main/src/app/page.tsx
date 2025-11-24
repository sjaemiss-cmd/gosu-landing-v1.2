"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Phone, Check, ChevronDown, ChevronUp, Star, ArrowRight, Menu, X, MapPin, Clock } from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for Tailwind classes
function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

// 1. Header
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className="absolute top-0 left-0 right-0 z-50 py-5"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="/logo-white.png"
            alt="고수의 운전면허 도봉점"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-6 text-sm font-medium text-gray-300">
            <a href="#calculator" className="hover:text-white transition-colors">비용 계산기</a>
            <a href="#usp" className="hover:text-white transition-colors">특장점</a>
            <a href="#reviews" className="hover:text-white transition-colors">후기</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>
          <a
            href="tel:02-930-9394"
            className="flex items-center gap-2 bg-brand-yellow text-brand-black px-4 py-2 rounded-full font-bold hover:bg-yellow-400 transition-colors"
          >
            <Phone size={18} />
            <span>전화 상담</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-black border-t border-gray-800 overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-4 text-sm font-medium text-gray-300">
              <a href="#calculator" onClick={() => setIsMobileMenuOpen(false)}>비용 계산기</a>
              <a href="#usp" onClick={() => setIsMobileMenuOpen(false)}>특장점</a>
              <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)}>후기</a>
              <a href="#faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
              <a
                href="tel:02-930-9394"
                className="flex items-center justify-center gap-2 bg-brand-yellow text-brand-black px-4 py-3 rounded-lg font-bold"
              >
                <Phone size={18} />
                <span>전화 상담</span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// 2. Hero Section
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero_background.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 z-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 bg-brand-yellow/20 text-brand-yellow text-sm md:text-base font-bold rounded-full mb-6 border border-brand-yellow/30 backdrop-blur-sm">
              노원·도봉지역 운전면허 합격률 1위
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white mb-8 break-keep tracking-tight">
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-[length:200%_auto]"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                운전면허,
              </motion.span>
              <br />
              비용은 <span className="text-brand-yellow">가볍게</span>
              <br className="md:hidden" /> 실력은 <span className="text-brand-yellow">확실하게</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-2xl mb-10 leading-relaxed break-keep max-w-3xl mx-auto">
              불합격할 때마다 추가되는 비용과 시간.<br className="md:hidden" />
              고수의 운전면허에서 <strong className="text-brand-yellow">반값으로 한 번에</strong> 합격하세요.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// 3. Cost Calculator
const CostCalculator = () => {
  const [fails, setFails] = useState(2);

  // Costs
  const academyBase = 1000000;
  const academyFailCost = 150000;
  const gosuBase = 550000;
  const gosuFailCost = 25000;

  const academyTotal = academyBase + (fails * academyFailCost);
  const gosuTotal = gosuBase + (fails * gosuFailCost);
  const savings = academyTotal - gosuTotal;

  const maxCost = academyBase + (5 * academyFailCost); // Max possible cost for scaling

  return (
    <section id="calculator" className="min-h-screen flex flex-col justify-center py-12 md:py-20 bg-brand-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 break-keep">
            운전면허 취득 비용,<br className="md:hidden" /> <span className="text-status-red">얼마나 낭비하시겠습니까?</span>
          </h2>
          <p className="text-gray-400 break-keep">슬라이더를 움직여서 절약 금액을 확인해보세요.</p>
        </div>

        <div className="max-w-4xl mx-auto bg-gray-900 rounded-3xl shadow-xl p-6 md:p-12 border border-gray-800">
          {/* Custom Interactive Slider */}
          <div className="mb-16 relative">
            <div className="text-center mb-8">
              <span className="text-gray-400 text-sm font-medium bg-gray-800 px-4 py-2 rounded-full border border-gray-700">
                👇 아래 버튼을 좌우로 움직여보세요
              </span>
            </div>

            <div className="relative h-12 flex items-center justify-center select-none touch-none">
              {/* Hidden Native Input for Interaction */}
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={fails}
                onChange={(e) => setFails(Number(e.target.value))}
                className="absolute w-full h-full opacity-0 z-30 cursor-pointer"
                aria-label="예상 불합격 횟수 설정"
              />

              {/* Visual Track Container */}
              <div className="relative w-full h-4 bg-gray-800 rounded-full shadow-inner border border-gray-700 overflow-hidden">
                {/* Filled Track */}
                <motion.div
                  className="absolute top-0 left-0 h-full bg-brand-yellow"
                  initial={{ width: "40%" }}
                  animate={{ width: `${(fails / 5) * 100}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>

              {/* Ticks */}
              <div className="absolute inset-0 w-full h-4 top-1/2 -translate-y-1/2 flex justify-between items-center px-1 pointer-events-none">
                {[0, 1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className={`w-1 h-1 rounded-full transition-colors duration-300 z-10 ${step <= fails ? 'bg-brand-black/50' : 'bg-gray-600'}`} />
                ))}
              </div>

              {/* Visual Thumb */}
              <motion.div
                className="absolute top-1/2 w-8 h-8 bg-white border-4 border-brand-yellow rounded-full shadow-[0_0_15px_rgba(254,206,72,0.5)] z-20 flex items-center justify-center pointer-events-none"
                initial={{ left: "40%" }}
                animate={{ left: `${(fails / 5) * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ x: "-50%", y: "-50%" }}
              >
                <div className="w-2 h-2 bg-brand-black rounded-full" />
              </motion.div>

              {/* Floating Label */}
              <motion.div
                className="absolute -top-10 bg-brand-yellow text-brand-black font-bold px-3 py-1 rounded-lg text-sm shadow-lg pointer-events-none whitespace-nowrap"
                initial={{ left: "40%" }}
                animate={{ left: `${(fails / 5) * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ x: "-50%" }}
              >
                {fails}회 불합격
                <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-brand-yellow rotate-45"></div>
              </motion.div>
            </div>

            <div className="flex justify-between text-xs md:text-sm text-gray-500 mt-2 font-medium px-1">
              <span>0회 (한방 합격)</span>
              <span>5회 (보통)</span>
            </div>
          </div>

          {/* Horizontal Stacked Bar Chart */}
          <div className="flex flex-col gap-6 mb-12">
            {/* Academy Row */}
            <div className="w-full">
              <div className="flex justify-between mb-2 text-sm font-bold text-gray-400">
                <span>일반 학원</span>
                <span>{academyTotal.toLocaleString()}원</span>
              </div>
              <div className="w-full h-12 bg-gray-800 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(academyTotal / maxCost) * 100}%` }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="h-full bg-status-red flex items-center justify-end px-4"
                >
                  <span className="text-white font-bold whitespace-nowrap text-sm md:text-base">비용 발생</span>
                </motion.div>
              </div>
            </div>

            {/* Gosu Row */}
            <div className="w-full">
              <div className="flex justify-between mb-2 text-sm font-bold text-gray-400">
                <span>고수의 운전면허</span>
                <span>{gosuTotal.toLocaleString()}원</span>
              </div>
              <div className="w-full h-12 bg-gray-800 rounded-full overflow-hidden relative flex">
                {/* Gosu Cost */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(gosuTotal / maxCost) * 100}%` }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="h-full bg-white flex items-center justify-start px-4 z-10"
                >
                  <span className="text-brand-black font-bold whitespace-nowrap text-sm md:text-base">고수</span>
                </motion.div>

                {/* Savings (The Gap) */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(savings / maxCost) * 100}%` }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="h-full bg-brand-yellow flex items-center justify-center relative"
                >
                  {/* Animated Stripes Pattern */}
                  <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)]"></div>

                  <span className="text-brand-black font-extrabold whitespace-nowrap z-10 px-2 text-sm md:text-base">
                    {savings.toLocaleString()}원 SAVE!
                  </span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="bg-gray-800 border border-brand-yellow/30 text-white rounded-2xl p-6 text-center transform scale-100 md:scale-105 shadow-2xl">
            <p className="text-gray-400 text-sm mb-1">고수에서 시작하면</p>
            <div className="text-3xl md:text-5xl font-extrabold text-brand-yellow mb-2 break-keep">
              총 {savings.toLocaleString()}원 절약!
            </div>
            <p className="text-sm text-gray-500 break-keep">
              * 일반 학원 평균 재시험 비용 기준<br className="md:hidden" /> (2시간 추가연습 + 재시험 응시료)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// 4. USP Section
const USP = () => {
  const features = [
    {
      icon: <Star className="w-10 h-10 text-brand-yellow" />,
      title: "합격 무제한 보장",
      desc: "합격할 때까지 추가 비용 없이 연습하세요. 면허 취득의 끝까지 함께합니다.",
    },
    {
      icon: <Check className="w-10 h-10 text-brand-yellow" />,
      title: "1:1 맞춤 코칭",
      desc: "나의 부족한 점만 쏙쏙 골라 집중 공략! 전문 매니저가 옆에서 밀착 케어합니다.",
    },
    {
      icon: <Phone className="w-10 h-10 text-brand-yellow" />,
      title: "원하는 시간 예약",
      desc: "내 스케줄에 맞춰 자유롭게 예약 가능. 바쁜 직장인, 학생도 OK!",
    },
    {
      icon: <Star className="w-10 h-10 text-brand-yellow" />,
      title: "연예인·인플루언서의 선택",
      desc: "이미 수많은 연예인과 인플루언서들이 고수 도봉점에서 면허를 취득해갔습니다. SNS, 방송에서 인정받은 '면허맛집'!",
    },
  ];

  return (
    <section id="usp" className="min-h-screen flex flex-col justify-center py-12 md:py-20 bg-brand-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 break-keep">
            왜 <span className="text-brand-yellow">고수의 운전면허 도봉점</span>인가요?
          </h2>
          <p className="text-gray-400 break-keep">다른 곳과는 비교할 수 없는 특별한 혜택</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="bg-gray-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 break-keep">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed break-keep">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 5. Social Proof (Infinite Marquee)
const SocialProof = () => {
  const reviews = [
    {
      id: 0,
      image: "https://gosudriving.com/data/files/99196b4682b37e1fbb5d91dd50b6eec1.jpg",
      text: "면허 땄어요. 기분이 너무 좋네요",
      name: "김*화",
      date: "2025-11-07"
    },
    {
      id: 1,
      image: "https://gosudriving.com/data/files/9bff5922d928a1d43c9e49f0130657e3.jpg",
      text: "친절한 강사님 덕분에 빠르게 면허 딸 수 있었습니다!! 정말 좋으니까 와보시는 거 추천드려요!!",
      name: "김*윤",
      date: "2025-11-07"
    },
    {
      id: 2,
      image: "https://gosudriving.com/data/files/ac2a02a5810d8428e0257c14c67f8ccd.jpg",
      text: "선생님의 좋은 지도 덕분에 면허 합격했습니다 !!! 면허 합격 이후에도 주차 알려주셔서 너무 좋은 것 같아요!",
      name: "박*현",
      date: "2025-11-07"
    },
    {
      id: 3,
      image: "https://gosudriving.com/data/files/a3fb1491e02bc3b049fcaed792ad14ac.webp",
      text: "운전이 무서우면 고수운전학원 2주면 합격 50대후반 합격햇네요 화이팅감사합니다",
      name: "서*원",
      date: "2025-11-07"
    },
    {
      id: 4,
      image: "https://gosudriving.com/data/files/89dde8c23f9dfba95b2de557e7840afd.jpg",
      text: "시뮬레이션이 실제로 차로 운전하는거랑 비슷해요! 코스 그대로 나와있어서 익히기 좋아요! 추천해요!!",
      name: "김*아",
      date: "2025-11-01"
    },
    {
      id: 5,
      image: "https://gosudriving.com/data/files/6a7f68077417836a0690f3c82c8b0dd7.jpg",
      text: "시뮬레이션으로도 충분히 실제 차랑 비슷해서 연습하기 좋았습니다. 덕분에 기능 도로주행 둘 다 한 번에 합격했어요!",
      name: "이*혜",
      date: "2025-11-01"
    },
    {
      id: 6,
      image: "https://gosudriving.com/data/files/704f5b4952b9d64d0cdcf019a32a2e39.png",
      text: "선생님 너무 친절하셨고 하나하나 다 알려주셔서 빠르게 취득했습니다!! 감사합니다",
      name: "김*승",
      date: "2025-11-01"
    },
    {
      id: 7,
      image: "https://gosudriving.com/data/files/e3daf4c56380929b38395b563a0cdb9d.jpg",
      text: "처음 하는 운전이라 겁이 많았는데, 시뮬레이션으로 배우니 안전하게 배울 수 있어서 안심이 됐습니다.",
      name: "배*리",
      date: "2025-09-16"
    }
  ];

  return (
    <section id="reviews" className="min-h-screen flex flex-col justify-center py-12 md:py-20 bg-brand-black overflow-hidden">
      <div className="container mx-auto px-4 mb-8 md:mb-12 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 break-keep">
          이미 <span className="text-brand-yellow">수많은 합격자</span>가 증명합니다
        </h2>
        <p className="text-gray-400 break-keep">도봉점 실제 수강생들의 생생한 합격 인증</p>
      </div>

      <div className="relative flex w-full mb-12">
        <motion.div
          className="flex gap-6 whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {[...reviews, ...reviews].map((review, index) => (
            <div
              key={index}
              className="w-64 h-80 md:w-80 md:h-96 flex-shrink-0 bg-gray-800 rounded-xl overflow-hidden relative group"
            >
              {/* Replace src with actual review image */}
              <img
                src={review.image}
                alt={review.text}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-12">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-brand-yellow font-bold text-sm">{review.name}</span>
                  <span className="text-gray-400 text-xs">{review.date}</span>
                </div>
                <p className="text-white text-sm font-medium line-clamp-2">{review.text}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="text-center">
        <a
          href="https://pcmap.place.naver.com/place/38729351/review?additionalHeight=76&entry=plt&fromPanelNum=1&locale=ko&svcName=map_pcv5&timestamp=202511240203"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-transparent border-2 border-brand-yellow text-brand-yellow px-8 py-3 rounded-full font-bold hover:bg-brand-yellow hover:text-brand-black transition-all duration-300"
        >
          더 많은 생생한 후기 보러가기 <ArrowRight size={20} />
        </a>
      </div>
    </section>
  );
};

// 6. Student Discount Event (FOMO)
const StudentEvent = () => {
  // Calculate days remaining (Assuming deadline is Nov 30)
  const deadline = new Date("2025-11-30T23:59:59");
  const today = new Date();
  const diffTime = Math.abs(deadline.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-brand-black to-gray-900 border-y border-gray-800">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-gray-800 rounded-3xl p-6 md:p-12 border-2 border-brand-yellow shadow-[0_0_30px_rgba(254,206,72,0.15)] relative overflow-hidden"
        >
          {/* Badge */}
          <div className="absolute top-0 right-0 bg-status-red text-white font-bold px-4 py-1 md:px-6 md:py-2 text-sm md:text-base rounded-bl-2xl shadow-lg animate-pulse">
            마감 임박! D-{diffDays}
          </div>

          <h2 className="text-2xl md:text-5xl font-extrabold text-white mb-4 md:mb-6 break-keep">
            수험생 여러분,<br />
            <span className="text-brand-yellow">최대 20% 할인</span> 놓치지 마세요!
          </h2>

          <p className="text-gray-300 text-base md:text-lg mb-6 md:mb-8 break-keep leading-relaxed">
            <span className="text-white font-bold">11월 30일</span>까지, 딱 <span className="text-status-red font-bold">일주일</span> 남았습니다.
          </p>

          <div className="bg-gray-900 rounded-xl p-4 md:p-6 mb-6 md:mb-8 inline-block w-full max-w-2xl">
            <ul className="text-left space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <Check className="text-brand-yellow flex-shrink-0 mt-1" size={20} />
                <span>수험표 지참 시 <strong className="text-white">기본 10% 할인</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-brand-yellow flex-shrink-0 mt-1" size={20} />
                <span>친구와 함께 등록 시 <strong className="text-white">15% 할인</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-brand-yellow flex-shrink-0 mt-1" size={20} />
                <span>인스타그램 업로드 시 <br></br><strong className="text-white">중복 5% 추가 할인</strong> (최대 20%)</span>
              </li>
            </ul>
          </div>

          <motion.a
            href="https://pf.kakao.com/_hxlxnIs"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-brand-yellow text-brand-black px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:bg-yellow-400 transition-colors"
          >
            수험표 할인받고 등록하기 <ArrowRight size={24} />
          </motion.a>

          <p className="mt-4 text-sm text-gray-500">
            * 선착순 마감될 수 있습니다. 서두르세요!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// 6.5 Location Section (New)
const LocationSection = () => {
  return (
    <section className="py-12 md:py-20 bg-brand-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 break-keep">
            <span className="text-brand-yellow">노원역 3번 출구</span>에서<br className="md:hidden" /> 걸어서 <span className="text-brand-yellow">단 2분</span>
          </h2>
          <p className="text-gray-400 break-keep">더 이상 멀리 다니지 마세요. 역세권 최고의 접근성!</p>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Naver Map Image */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col gap-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <a
              href="https://map.naver.com/p/entry/place/38729351?placePath=/home?entry=plt&from=map&fromPanelNum=1&additionalHeight=76&timestamp=202511241635&locale=ko&svcName=map_pcv5&searchType=place&lng=127.0605764&lat=37.6559517&c=15.00,0,0,0,dh"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border-2 border-gray-800 shadow-2xl group"
            >
              <Image
                src="/naver_map.png"
                alt="고수의 운전면허 도봉점 네이버 지도"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 bg-brand-black/80 text-white px-4 py-2 rounded-full text-sm font-bold transition-opacity duration-300">지도 크게 보기</span>
              </div>
            </a>

            <a
              href="https://map.naver.com/p/entry/place/38729351?placePath=/home?entry=plt&from=map&fromPanelNum=1&additionalHeight=76&timestamp=202511241635&locale=ko&svcName=map_pcv5&searchType=place&lng=127.0605764&lat=37.6559517&c=15.00,0,0,0,dh"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#03C75A] text-white px-6 py-4 rounded-xl font-bold hover:bg-[#02b351] transition-colors duration-300 shadow-lg"
            >
              네이버 지도로 보기 <ArrowRight size={20} />
            </a>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="w-full md:w-1/2 text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-brand-yellow/10 p-3 rounded-full">
                  <MapPin className="text-brand-yellow" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">편하게 걸어올 위치</h3>
                  <p className="text-gray-400 leading-relaxed">
                    <strong className="text-white">노원역 3번 출구</strong>로 나오셔서 직진 100m,<br />
                    미도빌딩 5층에 위치해 있습니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-yellow/10 p-3 rounded-full">
                  <Check className="text-brand-yellow" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">시험장과 가까운 거리</h3>
                  <p className="text-gray-400 leading-relaxed">
                    <strong className="text-white">도봉운전면허시험장</strong>까지<br />
                    도보로 <strong className="text-brand-yellow">단 5분</strong> 거리입니다.<br />
                    연습 후 바로 시험 보러 가기 최적의 위치!
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-yellow/10 p-3 rounded-full">
                  <Clock className="text-brand-yellow" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">편리한 방문</h3>
                  <p className="text-gray-400 leading-relaxed">
                    대중교통 이용이 매우 편리하며,<br />
                    건물 내 주차도 가능합니다. (사전 문의 필수)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// 7. FAQ
const FAQ = () => {
  const faqs = [
    {
      q: "정말 시뮬레이터로 연습해도 합격할 수 있나요?",
      a: "네, 가능합니다! 실제 시험장 코스를 완벽하게 구현하여 코스 암기와 핸들링 감각을 익히는데 최적화되어 있습니다. 실제 차를 타기 전 충분한 연습이 되어 합격률이 매우 높습니다.",
    },
    {
      q: "운전을 아예 처음 해보는데 괜찮을까요?",
      a: "물론입니다. 기초 조작법부터 차근차근 1:1로 알려드리기 때문에 초보자분들도 걱정 없이 시작하실 수 있습니다.",
    },
    {
      q: "예약은 어떻게 하나요?",
      a: "카카오톡을 통해 원하시는 시간에 자유롭게 예약하실 수 있습니다. 당일 예약도 가능합니다.",
    },
    {
      q: "불합격하면 추가 비용이 드나요?",
      a: "합격보장반을 등록하시면 합격하실 때까지 추가 비용 없이 무제한으로 연습하실 수 있습니다.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="min-h-screen flex flex-col justify-center py-12 md:py-20 bg-brand-black">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">자주 묻는 질문</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 bg-gray-900 hover:bg-gray-800 transition-colors text-left"
              >
                <span className="font-bold text-lg text-white break-keep pr-4">{faq.q}</span>
                {openIndex === index ? <ChevronUp className="text-gray-400 flex-shrink-0" /> : <ChevronDown className="text-gray-400 flex-shrink-0" />}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-gray-900 px-6 pb-6 text-gray-400 leading-relaxed"
                  >
                    <div className="pt-2 border-t border-gray-800 mt-2 break-keep">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 7. Floating CTA
const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 md:bottom-8 md:left-auto md:right-8 z-40 p-4 md:p-0 flex flex-row md:flex-col gap-3 items-center md:items-end"
        >
          {/* Naver Button */}
          <a
            href="https://pcmap.place.naver.com/place/38729351/ticket"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-none w-full md:w-auto bg-[#03C75A] text-white font-bold text-lg py-4 px-6 rounded-xl shadow-xl hover:bg-[#02b351] transition-colors text-center flex items-center justify-center gap-2"
          >
            <span className="font-extrabold">N</span>
            <span>네이버 예약</span>
          </a>

          {/* Kakao Button */}
          <a
            href="https://pf.kakao.com/_hxlxnIs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-none w-full md:w-auto bg-brand-yellow text-brand-black font-bold text-lg py-4 px-6 rounded-xl shadow-xl hover:bg-yellow-400 transition-colors text-center flex items-center justify-center gap-2 relative"
          >
            <span className="bg-brand-black text-brand-yellow text-xs px-2 py-0.5 rounded-full absolute -top-3 left-1/2 md:left-auto md:right-4 transform -translate-x-1/2 md:translate-x-0 animate-bounce whitespace-nowrap">
              상담 무료!
            </span>
            <span className="font-extrabold">K</span>
            <span>카카오톡 상담</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// 8. Footer
const Footer = () => {
  return (
    <footer className="bg-gray-900 py-12 text-gray-400 text-sm">
      <div className="container mx-auto px-4 text-center md:text-left">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <div className="mb-6 flex justify-center md:justify-start">
              <img
                src="/logo-white.png"
                alt="고수의 운전면허 도봉점"
                className="h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-all duration-300"
              />
            </div>
            <p className="mb-4">
              서울 노원구 동일로1426 미도빌딩 5층 504호<br />
              사업자등록번호: 415-16-63829
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">메뉴</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">서비스 소개</a></li>
              <li><a href="#" className="hover:text-white transition-colors">이용 요금</a></li>
              <li><a href="#" className="hover:text-white transition-colors">오시는 길</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">고객센터</h4>
            <p className="font-bold text-lg text-white mb-2">02-930-9394</p>
            <p>평일 09:00 - 21:00<br />토요일 10:00 - 18:00<br />일요일 휴무</p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-600">
          &copy; 2024 고수의 운전면허 도봉점. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-black font-sans text-white selection:bg-brand-yellow selection:text-brand-black overflow-x-hidden relative">
      {/* Background Texture */}
      <div
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "url('/background_texture.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "400px",
          filter: "invert(1)"
        }}
      ></div>
      <div className="relative z-10">
        <Header />
        <Hero />
        <CostCalculator />
        <USP />
        <SocialProof />
        <LocationSection />
        <StudentEvent />
        <FAQ />
        <Footer />
        <FloatingCTA />
      </div>
    </main>
  );
}
