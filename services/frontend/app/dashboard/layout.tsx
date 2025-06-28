import { Fragment, JSX, PropsWithChildren } from 'react';
import { styles } from './styles.css';

export default function DashboardLayout(props: PropsWithChildren): JSX.Element {
    return (
        <Fragment>
            <main className={styles.Main}>
                navigation
                {props.children}
            </main>
            <footer>
                footer
            </footer>
        </Fragment>
    );
}
