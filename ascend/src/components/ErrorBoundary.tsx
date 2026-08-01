import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

// Catches render errors anywhere below it in the tree and shows a real
// screen with the actual error, instead of the app silently going blank.
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("[ErrorBoundary] caught:", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] text-white p-6">
          <div className="max-w-lg w-full p-6 rounded-3xl border border-white/10 bg-white/5 space-y-4">
            <h2 className="text-xl font-bold text-red-400">Something broke on this screen</h2>
            <p className="text-sm text-muted-foreground">
              This is a real error, not a network issue — nothing was lost, and your progress is safe.
            </p>
            <pre className="text-xs text-red-300 bg-black/30 p-3 rounded-xl overflow-auto max-h-40">
              {this.state.error?.message || "Unknown error"}
            </pre>
            <div className="flex gap-3">
              <button
                onClick={this.handleReset}
                className="px-4 py-2 rounded-full bg-white text-black text-xs font-semibold"
              >
                Try again
              </button>
              <button
                onClick={() => (window.location.href = "/dashboard")}
                className="px-4 py-2 rounded-full bg-white/10 text-white text-xs font-semibold"
              >
                Back to dashboard
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
