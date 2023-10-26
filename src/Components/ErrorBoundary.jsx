import { Component } from "react";
import { Outlet } from "react-router-dom";
import ErrorBoundaryMessage from "../Pages/ErrorBoundaryMessage";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
  };

  componentDidCatch(error, info) {
    console.error(error);
    console.error(info);
    this.setState({ hasError: true, error });
  }

  render() {

    const { isDarkMode } = this.props

    if (this.state.hasError) {
      return <ErrorBoundaryMessage error={this.state.error} isDarkMode={isDarkMode}/>;
    }
    return <Outlet />;
  }
}

export default ErrorBoundary;