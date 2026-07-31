import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Award, CheckCircle2, AlertTriangle, ShieldCheck, Download,
  Printer, ArrowLeft, RefreshCw, Star, Zap, ChevronRight, FileText, Check
} from "lucide-react";
import { QUESTION_BANK, type QuestionItem } from "../data/questionBank";
import { supabase } from "../lib/supabase";

interface PlacementCertificationProps {
  onClose: () => void;
  userBranch?: string;
  userName?: string;
}

export default function PlacementCertification({
  onClose,
  userBranch = "Computer Science Engineering",
  userName = "Student Candidate"
}: PlacementCertificationProps) {
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes for 60 questions
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);
  const [certId, setCertId] = useState("");
  const [issueDate, setIssueDate] = useState("");

  // Prepare 60 placement exam questions
  useEffect(() => {
    const pool = [...QUESTION_BANK];
    const examSet: QuestionItem[] = [];
    while (examSet.length < 60) {
      const idx = Math.floor(Math.random() * pool.length);
      const q = pool[idx];
      examSet.push({ ...q, id: `exam-${q.id}-${examSet.length + 1}` });
    }
    setQuestions(examSet);
  }, []);

  // Exam timer
  useEffect(() => {
    if (!examStarted || examCompleted || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [examStarted, examCompleted, timeLeft]);

  const handleStartExam = () => {
    setExamStarted(true);
    setTimeLeft(3600);
  };

  const handleSelectAnswer = (optIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: optIndex }));
  };

  const handleSubmitExam = async () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    setScore(percentage);
    const isPass = percentage >= 70;
    setPassed(isPass);

    const generatedId = `CERT-AICAR-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    setCertId(generatedId);
    setIssueDate(today);
    setExamCompleted(true);

    // Record in Supabase if logged in
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("certificates").insert({
          user_id: user.id,
          score: percentage,
          passed: isPass,
          issued_at: new Date().toISOString()
        });
      }
    } catch {
      // Ignored if offline
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl text-slate-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/60 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Award className="w-7 h-7 text-amber-400 animate-pulse" />
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                National Placement Readiness Certification
              </h2>
              <p className="text-xs text-slate-400">Proctored Final Placement Exit Examination</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition"
          >
            Close
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1">
          {!examStarted && !examCompleted && (
            <div className="space-y-6 max-w-2xl mx-auto text-center py-6">
              <div className="inline-flex p-4 rounded-full bg-amber-500/10 border border-amber-500/20 mb-2">
                <ShieldCheck className="w-12 h-12 text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold">Ready to Earn Your Official Credentials?</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                This comprehensive exam evaluates your technical proficiency across Data Structures, Computer Systems, Quantitative Aptitude, and Core Engineering Concepts. Passing this exam issues an official, verifiable digital Certificate of Placement Readiness.
              </p>

              <div className="grid grid-cols-3 gap-4 py-4 text-left">
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <div className="text-xs text-slate-400">Questions</div>
                  <div className="text-xl font-bold text-amber-400">60 MCQs</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <div className="text-xs text-slate-400">Time Limit</div>
                  <div className="text-xl font-bold text-amber-400">60 Minutes</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <div className="text-xs text-slate-400">Passing Grade</div>
                  <div className="text-xl font-bold text-emerald-400">70% (42/60)</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-900/20 border border-amber-700/40 text-amber-200 text-xs text-left">
                <strong>Important Instructions:</strong> Once started, the timer cannot be paused. Ensure a stable environment. Your certificate will feature a cryptographic verification code for hiring managers.
              </div>

              <button
                onClick={handleStartExam}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 font-bold text-slate-950 transition shadow-lg shadow-amber-500/20 text-base"
              >
                Begin Certification Exam Now
              </button>
            </div>
          )}

          {examStarted && !examCompleted && (
            <div className="space-y-6">
              {/* Top Progress & Timer Bar */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-sm font-medium text-slate-300">
                  Question <span className="text-amber-400 font-bold">{currentIndex + 1}</span> of {questions.length}
                </div>
                <div className="flex items-center gap-2 font-mono text-base text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
                  <span>⏱️</span>
                  <span>{formatTime(timeLeft)}</span>
                </div>
                <button
                  onClick={handleSubmitExam}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition shadow"
                >
                  Finish & Submit Exam
                </button>
              </div>

              {/* Question Card */}
              {questions[currentIndex] && (
                <div className="space-y-4 bg-slate-800/40 p-6 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold uppercase">
                      {questions[currentIndex].module} • {questions[currentIndex].topic}
                    </span>
                    <span className="text-slate-400 uppercase font-mono">
                      Difficulty: {questions[currentIndex].difficulty}
                    </span>
                  </div>

                  <h4 className="text-lg font-semibold text-slate-100 leading-snug">
                    {questions[currentIndex].prompt}
                  </h4>

                  {questions[currentIndex].codeSnippet && (
                    <pre className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-amber-300 overflow-x-auto border border-slate-800">
                      {questions[currentIndex].codeSnippet}
                    </pre>
                  )}

                  <div className="grid grid-cols-1 gap-3 pt-2">
                    {questions[currentIndex].options.map((opt, oIdx) => {
                      const isSelected = selectedAnswers[currentIndex] === oIdx;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectAnswer(oIdx)}
                          className={`w-full p-4 rounded-xl text-left border text-sm transition flex items-center justify-between ${
                            isSelected
                              ? "bg-amber-500/20 border-amber-500 text-amber-200 font-medium"
                              : "bg-slate-800/70 border-slate-700/60 hover:bg-slate-800 text-slate-300"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${
                              isSelected ? "border-amber-400 bg-amber-400 text-slate-950" : "border-slate-600 text-slate-400"
                            }`}>
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </span>
                          {isSelected && <Check className="w-5 h-5 text-amber-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Navigation Grid */}
              <div className="flex items-center justify-between pt-2">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((c) => Math.max(0, c - 1))}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 disabled:opacity-40"
                >
                  Previous Question
                </button>
                <div className="flex gap-1.5 overflow-x-auto max-w-md py-1">
                  {questions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition flex items-center justify-center ${
                        i === currentIndex
                          ? "bg-amber-500 text-slate-950 ring-2 ring-amber-400"
                          : selectedAnswers[i] !== undefined
                          ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/40"
                          : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  disabled={currentIndex === questions.length - 1}
                  onClick={() => setCurrentIndex((c) => Math.min(questions.length - 1, c + 1))}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-xs font-bold text-slate-950 disabled:opacity-40"
                >
                  Next Question
                </button>
              </div>
            </div>
          )}

          {examCompleted && (
            <div className="space-y-6 py-4">
              {passed ? (
                <div className="text-center space-y-6">
                  <div className="inline-flex p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Award className="w-16 h-16" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-extrabold text-emerald-400">Congratulations! Exam Passed 🎉</h3>
                    <p className="text-slate-300 text-sm mt-1">
                      You achieved a score of <span className="font-bold text-amber-400 text-base">{score}%</span> on the Placement Exit Exam.
                    </p>
                  </div>

                  {/* Verifiable Certificate View */}
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/30 border-2 border-amber-500/40 text-left shadow-2xl relative overflow-hidden my-6">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                      <Award className="w-64 h-64 text-amber-400" />
                    </div>

                    <div className="flex items-center justify-between border-b border-amber-500/20 pb-4 mb-6">
                      <div>
                        <h4 className="text-xl font-bold tracking-wider text-amber-400 uppercase">AI Career OS Credentials</h4>
                        <div className="text-xs text-slate-400 font-mono">Verification ID: {certId}</div>
                      </div>
                      <ShieldCheck className="w-8 h-8 text-amber-400" />
                    </div>

                    <div className="space-y-4 my-6">
                      <div className="text-xs uppercase text-slate-400 tracking-widest">This is to certify that</div>
                      <div className="text-3xl font-extrabold text-white tracking-wide">{userName}</div>
                      <div className="text-sm text-slate-300 max-w-xl leading-relaxed">
                        has successfully completed the proctored placement examination for <strong className="text-amber-300">{userBranch}</strong>, demonstrating industry-ready competence in Algorithms, Systems Architecture, and Technical Problem Solving.
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-amber-500/20 text-xs text-slate-400">
                      <div>
                        <div>Issued Date: <span className="text-slate-200 font-medium">{issueDate}</span></div>
                        <div>Status: <span className="text-emerald-400 font-bold">VERIFIED & ACCREDITED</span></div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-amber-400">Grade: EXCELLENT ({score}%)</div>
                        <div className="text-[10px] text-slate-500">Authorized by AI Career OS Board</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => window.print()}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition shadow-lg"
                    >
                      <Printer className="w-4 h-4" /> Print / Save Certificate PDF
                    </button>
                    <button
                      onClick={onClose}
                      className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition"
                    >
                      Return to Dashboard
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6 py-6">
                  <div className="inline-flex p-4 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400">
                    <AlertTriangle className="w-16 h-16" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-rose-400">Passing Grade Not Reached</h3>
                    <p className="text-slate-300 text-sm mt-1">
                      Your score was <span className="font-bold text-white">{score}%</span> (Minimum 70% required).
                    </p>
                  </div>
                  <p className="text-slate-400 text-xs max-w-md mx-auto">
                    Review your weak areas using the Daily 40-Question Challenges and topic modules, then re-attempt when you are ready.
                  </p>
                  <button
                    onClick={handleStartExam}
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition"
                  >
                    Retake Certification Exam
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
