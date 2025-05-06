import styles from './HomePage.module.css'
import { Logo } from '../components/Logo/Logo';

export function HomePage() {
  return (
    <div className={styles.home_page}>
       <Logo size="large" className={styles.homeLogo} />
      <h1>Welcome to the Task Manager</h1>
      <p>
        The best place to organize your tasks
      </p>
      <a href="/register">Start Your Management</a>
    </div>
  );
}