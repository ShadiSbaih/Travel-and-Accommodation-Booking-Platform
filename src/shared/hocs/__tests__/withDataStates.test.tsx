import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { withDataStates } from '../withDataStates';

// Mock components
const MockSkeleton = () => <div data-testid="skeleton">Loading...</div>;
const MockContent = ({ data }: { data?: string[] }) => (
  <div data-testid="content">
    {data?.map((item) => (
      <div key={item}>{item}</div>
    ))}
  </div>
);

describe('withDataStates HOC', () => {
  it('should render skeleton when isLoading is true', () => {
    const WrappedComponent = withDataStates<string[]>(MockContent, {
      LoadingSkeleton: MockSkeleton,
    });

    render(<WrappedComponent data={undefined} isLoading={true} />);
    
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
  });

  it('should render error state when isError is true', () => {
    const WrappedComponent = withDataStates<string[]>(MockContent, {
      LoadingSkeleton: MockSkeleton,
      errorTitle: 'Test Error',
      errorMessage: 'Something went wrong',
    });

    render(<WrappedComponent data={undefined} isError={true} />);
    
    expect(screen.getByText('Test Error')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
  });

  it('should render empty state when data is empty', () => {
    const WrappedComponent = withDataStates<string[]>(MockContent, {
      LoadingSkeleton: MockSkeleton,
      emptyTitle: 'No Data',
      emptySubtitle: 'Please add some items',
      isEmpty: (data) => !data || data.length === 0,
    });

    render(<WrappedComponent data={[]} isLoading={false} />);
    
    expect(screen.getByText('No Data')).toBeInTheDocument();
    expect(screen.getByText('Please add some items')).toBeInTheDocument();
    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
  });

  it('should render content when data is available', () => {
    const WrappedComponent = withDataStates<string[]>(MockContent, {
      LoadingSkeleton: MockSkeleton,
      isEmpty: (data) => !data || data.length === 0,
    });

    const testData = ['item1', 'item2', 'item3'];
    render(<WrappedComponent data={testData} isLoading={false} />);
    
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByText('item1')).toBeInTheDocument();
    expect(screen.getByText('item2')).toBeInTheDocument();
    expect(screen.getByText('item3')).toBeInTheDocument();
  });

  it('should call refetch when retry button is clicked', () => {
    const mockRefetch = jest.fn();
    const WrappedComponent = withDataStates<string[]>(MockContent, {
      LoadingSkeleton: MockSkeleton,
      errorTitle: 'Error',
      showRetryButton: true,
    });

    render(<WrappedComponent data={undefined} isError={true} refetch={mockRefetch} />);
    
    const retryButton = screen.getByRole('button', { name: /try again/i });
    retryButton.click();
    
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  it('should use custom isEmpty function', () => {
    const WrappedComponent = withDataStates<string[]>(MockContent, {
      LoadingSkeleton: MockSkeleton,
      emptyTitle: 'Custom Empty',
      isEmpty: (data) => !data || data.length < 5, // Custom: empty if less than 5 items
    });

    render(<WrappedComponent data={['item1', 'item2']} isLoading={false} />);
    
    expect(screen.getByText('Custom Empty')).toBeInTheDocument();
    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
  });

  it('should pass additional props to wrapped component', () => {
    interface CustomProps {
      data?: string[];
      customProp: string;
    }

    const CustomContent = ({ data, customProp }: CustomProps) => (
      <div data-testid="content">
        <div>{customProp}</div>
        {data?.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    );

    const WrappedComponent = withDataStates<string[], CustomProps>(CustomContent, {
      LoadingSkeleton: MockSkeleton,
      isEmpty: (data) => !data || data.length === 0,
    });

    render(
      <WrappedComponent 
        data={['item1']} 
        isLoading={false} 
        customProp="test value"
      />
    );
    
    expect(screen.getByText('test value')).toBeInTheDocument();
    expect(screen.getByText('item1')).toBeInTheDocument();
  });

  it('should use custom error component when provided', () => {
    const CustomError = () => <div data-testid="custom-error">Custom Error Component</div>;
    
    const WrappedComponent = withDataStates<string[]>(MockContent, {
      LoadingSkeleton: MockSkeleton,
      customErrorComponent: CustomError,
    });

    render(<WrappedComponent data={undefined} isError={true} />);
    
    expect(screen.getByTestId('custom-error')).toBeInTheDocument();
    expect(screen.queryByText('Unable to Load Data')).not.toBeInTheDocument();
  });

  it('should use custom empty component when provided', () => {
    const CustomEmpty = () => <div data-testid="custom-empty">Custom Empty Component</div>;
    
    const WrappedComponent = withDataStates<string[]>(MockContent, {
      LoadingSkeleton: MockSkeleton,
      customEmptyComponent: CustomEmpty,
      isEmpty: (data) => !data || data.length === 0,
    });

    render(<WrappedComponent data={[]} isLoading={false} />);
    
    expect(screen.getByTestId('custom-empty')).toBeInTheDocument();
    expect(screen.queryByText('No Data Available')).not.toBeInTheDocument();
  });

  it('should pass skeleton props to loading skeleton', () => {
    const SkeletonWithProps = ({ count }: { count: number }) => (
      <div data-testid="skeleton">Loading {count} items...</div>
    );

    const WrappedComponent = withDataStates<string[]>(MockContent, {
      LoadingSkeleton: SkeletonWithProps,
      skeletonProps: { count: 5 },
    });

    render(<WrappedComponent data={undefined} isLoading={true} />);
    
    expect(screen.getByText('Loading 5 items...')).toBeInTheDocument();
  });

  it('should set correct display name', () => {
    const TestComponent = ({ data }: { data?: string[] }) => <div>{data}</div>;
    TestComponent.displayName = 'TestComponent';

    const WrappedComponent = withDataStates<string[]>(TestComponent, {
      LoadingSkeleton: MockSkeleton,
    });

    expect(WrappedComponent.displayName).toBe('WithDataStates(TestComponent)');
  });

  it('should prioritize isError over isEmpty', () => {
    const WrappedComponent = withDataStates<string[]>(MockContent, {
      LoadingSkeleton: MockSkeleton,
      errorTitle: 'Error State',
      emptyTitle: 'Empty State',
      isEmpty: (data) => !data || data.length === 0,
    });

    render(<WrappedComponent data={[]} isError={true} />);
    
    // Should show error, not empty
    expect(screen.getByText('Error State')).toBeInTheDocument();
    expect(screen.queryByText('Empty State')).not.toBeInTheDocument();
  });

  it('should prioritize isLoading over all other states', () => {
    const WrappedComponent = withDataStates<string[]>(MockContent, {
      LoadingSkeleton: MockSkeleton,
      errorTitle: 'Error State',
      emptyTitle: 'Empty State',
      isEmpty: (data) => !data || data.length === 0,
    });

    render(<WrappedComponent data={[]} isLoading={true} isError={true} />);
    
    // Should show loading, not error or empty
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    expect(screen.queryByText('Error State')).not.toBeInTheDocument();
    expect(screen.queryByText('Empty State')).not.toBeInTheDocument();
  });
});
