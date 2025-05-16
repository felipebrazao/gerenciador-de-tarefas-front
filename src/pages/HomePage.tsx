import styles from './HomePage.module.css'
import { Logo } from '../components/Logo/Logo';

export function HomePage() {
  return (
    <div className={styles.home_page}>
       <Logo size="large" className={styles.homeLogo} />
      <h1>Welcome to the Task Manager</h1>
      <p>
        O melhor lugar para organizar suas tarefas
      </p>
      <a href="/register">Comece Seu Gerenciamento</a>
    </div>
  );
}