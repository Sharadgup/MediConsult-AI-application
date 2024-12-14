import fs from 'fs'
import path from 'path'

const usersFilePath = path.join(process.cwd(), 'data', 'users.json')

export interface User {
  id: string
  username: string
  password: string
}

export function getUsers(): User[] {
  const fileContents = fs.readFileSync(usersFilePath, 'utf8')
  const data = JSON.parse(fileContents)
  return data.users
}

export function saveUser(user: User): void {
  const users = getUsers()
  users.push(user)
  fs.writeFileSync(usersFilePath, JSON.stringify({ users }, null, 2))
}

export function findUser(username: string): User | undefined {
  const users = getUsers()
  return users.find(user => user.username === username)
}

