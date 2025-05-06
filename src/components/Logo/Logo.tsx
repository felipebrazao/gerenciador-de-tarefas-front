import styles from './Logo.module.css';
import logo from '../../../src/images/output-onlinepngtools.png';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  maintainAspectRatio?: boolean; 
}

export const Logo = ({ 
  size = 'medium', 
  className = '',
  maintainAspectRatio = true 
}: LogoProps) => {
  const sizeClasses = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
  };

  return (
    <div className={`${styles.logoContainer} ${sizeClasses[size]} ${className}`}>
      <img 
        src={logo} 
        alt="Task Manager Logo" 
        className={`${styles.logoImage} ${maintainAspectRatio ? styles.maintainAspect : ''}`}
      />
    </div>
  );
};