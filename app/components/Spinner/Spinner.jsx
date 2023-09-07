import { COLORS } from '@/app/constants';
import styled from 'styled-components';

export default function Spinner () {
  return (
    <Circle role='status'></Circle>
  )
}

const Circle = styled.div`
  width: 32px;
  height: 32px;
  display: inline-block;
  border-radius: 50%;
  border: 4px solid ${COLORS.light[900]};
  border-right-color: ${COLORS.primary[600]};
  animation: spin 1s linear infinite;

  @keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`