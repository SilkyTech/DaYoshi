import { error, redirect } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'
import bcrypt from 'bcrypt'

import { db } from '$lib/database'

// using an enum for user roles to avoid typos
// if you're not using TypeScript use an object
enum Roles {
    _NONE = "",
    __NONE = "",
    ___NONE = "",
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const load: PageServerLoad = async () => {
  // todo
}

const register: Action = async ({ request }) => {
  const data = await request.formData()
  const username = data.get('username')
  const password = data.get('password')

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    !username ||
    !password
  ) {
    throw error(400, { message: "Invalid username or password" })
  }

  const user = await db.user.findUnique({
    where: { username },
  })

  if (user) {
    throw error(400, { message: "Username is taken" })
  }

  let hash = await bcrypt.hash(password, 10)

  await db.user.create({
    data: {
      username,
      passwordHash: hash,
      userAuthToken: crypto.randomUUID(),
      role: { connect: { name: Roles.USER } },
    },
  })

  throw redirect(303, '/login')
}

export const actions: Actions = { register }