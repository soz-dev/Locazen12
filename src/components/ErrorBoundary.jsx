import React from "react";
import Maintenance from "@/pages/Maintenance";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.handleRetry = this.handleRetry.bind(this);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleRetry() {
    this.setState({ hasError: false });
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return <Maintenance error onRetry={this.handleRetry} />;
    }
    return this.props.children;
  }
}
