import { type ReactNode, useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface OrdersScrollContainerProps {
  children: ReactNode;
  className?: string;
}

export function OrdersScrollContainer({
  children,
  className,
}: OrdersScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 });

  const checkScrollPosition = () => {
    if (!containerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setShowLeftGradient(scrollLeft > 0);
    setShowRightGradient(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    checkScrollPosition();
    container.addEventListener("scroll", checkScrollPosition);
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      container.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      scrollLeft: containerRef.current.scrollLeft,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    e.preventDefault();
    const dx = e.clientX - dragStart.x;
    containerRef.current.scrollLeft = dragStart.scrollLeft - dx;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.shiftKey) {
      e.preventDefault();
      if (containerRef.current) {
        containerRef.current.scrollLeft += e.deltaY;
      }
    }
  };

  return (
    <div className="relative flex-1 overflow-hidden">
      {/* Left gradient fade */}
      {showLeftGradient && (
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      )}
      
      {/* Right gradient fade */}
      {showRightGradient && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      )}
      
      {/* Scroll container with custom scrollbar */}
      <div
        ref={containerRef}
        className={cn(
          "h-full overflow-x-auto overscroll-x-contain snap-x snap-mandatory",
          "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40",
          "scrollbar-thumb-rounded-full",
          isDragging && "cursor-grabbing select-none",
          !isDragging && "cursor-grab",
          className
        )}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'hsl(var(--muted-foreground) / 0.2) transparent',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {children}
      </div>
    </div>
  );
}
