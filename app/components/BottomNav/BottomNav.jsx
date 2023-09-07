"use client"

import styled from 'styled-components'
import Icon from '../Icon/Icon'
import Link from 'next/link'
import useIsMounted from '@/app/hooks/useIsMounted'
import { COLORS } from '@/app/constants'

export default function BottomNav({ ...delegated }) {
  if (!useIsMounted()) return null;

  return (
    <Wrapper className={...delegated}>
      <NavLink href="/">
        <Icon id="pokeball" size={32}/>
        <span>Home</span>
      </NavLink>
      <NavLink href="/favorites">
        <Icon id="bookmark" size={32}/>
        <span>Favorites</span>
      </NavLink>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  background-color: ${COLORS.primary[800]};
  color: ${COLORS.light[700]};
  display: flex;
  justify-content: space-around;
  width: 60%;
  max-width: 300px;
  margin-inline: auto;
  border-radius: 14px;
  padding: 8px ;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: ${14 / 16}rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`