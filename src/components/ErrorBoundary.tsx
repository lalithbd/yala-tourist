"use client";

import { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-[50vh] items-center justify-center px-4">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Something went wrong
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                An unexpected error occurred. Please try refreshing the page.
              </p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
