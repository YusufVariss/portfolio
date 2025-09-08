"use client";

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <div 
      className={`fixed inset-0 bg-black flex items-center justify-center z-50 transition-opacity duration-1000 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <h1 className="text-5xl font-bold text-yellow-400 animate-pulse">
        Welcome to My Portfolio
      </h1>
    </div>
  );
}
