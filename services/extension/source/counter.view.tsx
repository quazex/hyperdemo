import { useCounter } from '@mantine/hooks';
import { FunctionComponent } from 'preact';
import { CounterStyles } from './counter.css';

export const Counter: FunctionComponent = () => {
    const [count, setCount] = useCounter(0);

    return (
        <div className={CounterStyles}>
            <p>Google Meet Addon</p>
            <button onClick={setCount.increment}>
                {count}
            </button>
        </div>
    );
};
