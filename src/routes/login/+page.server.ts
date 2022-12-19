import { error, redirect } from '@sveltejs/kit'
import bcrypt from 'bcrypt'
import type { Action, Actions, PageServerLoad } from './$types'

import { db } from '$lib/database'

export const load: PageServerLoad = async () => {
  // todo
}

const login: Action = async ({ cookies, request }) => {
  const data = await request.formData()
  const username = data.get('username')
  const password = data.get('password')

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    !username ||
    !password
  ) {
    throw error(400, { message: "Username and password is required." })
  }

  const user = await db.user.findUnique({ where: { username } })

  if (!user) {
    throw error (400, { message: "That account doesn't exist." })
  }

  const userPassword = await bcrypt.compare(password, user.passwordHash)

  if (!userPassword) {
    throw error(400, { message: "You have entered the wrong credentials." })
  }

  // generate new auth token just in case
  const authenticatedUser = await db.user.update({
    where: { username: user.username },
    data: { userAuthToken: crypto.randomUUID() },
  })

  cookies.set('session', authenticatedUser.userAuthToken, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: false,
    maxAge: 60 * 60 * 24 * 30,
  })

  // redirect the user
  throw redirect(302, '/game')
}

export const actions: Actions = { login }