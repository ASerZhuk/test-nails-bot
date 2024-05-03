import User from '../../app/models/User.ts'

import bot from '@/pages/api/bot'
import Masters from '../../app/models/Master.ts'
import dbConnect from '../../app/libs/dbConnect.ts'

const webAppUrl = 'https://test-nails-bot.vercel.app'

export default async function handler(req, res) {
	await dbConnect()
	if (req.method === 'POST') {
		try {
			const { message } = req.body
			if (!message || !message.chat || !message.chat.id) {
				console.error('Ошибка: поле chat или его id не определены в сообщении')
				res
					.status(400)
					.end('Ошибка: поле chat или его id не определены в сообщении')
				return
			}
			const chatId = message.chat.id.toString()
			const text = message.text
			const username = message.chat.username
			const userId = message.from.id.toString()

			if (text === '/start') {
				let user = await User.findOne({ userId: userId })
				if (!user) {
					const masterUserExists = await Masters.findOne({ isMaster: true })
					const userData = {
						firstName: message.chat.first_name,
						lastName: message.chat.last_name,
						username: username,
						chatId: chatId,
						userId: userId,
					}
					// Создаем пользователя с isMaster: true, если он не существует
					if (!masterUserExists) {
						userData.isMaster = true
						// Создаем запись в коллекции Master
						await Masters.create({
							firstName: message.chat.first_name,
							lastName: message.chat.last_name,
							username: username,
							chatId: chatId,
							userId: userId,
							category: '',
							image: '',
							startTime: '06:00',
							endTime: '06:00',
							interval: 0,
							slotTime: [],
							price: '',
							isMaster: true,
						})
					}
					user = await User.create(userData)
				}

				let inlineKeyboard = []

				// Если пользователь мастер, добавляем кнопку "Запись ко мне"
				if (user.isMaster) {
					inlineKeyboard.push([
						{ text: 'Мой профиль', web_app: { url: webAppUrl } },
					])
				} else {
					// Если пользователь не мастер, добавляем кнопку "Мои записи"
					inlineKeyboard.push([
						{ text: 'Записаться', web_app: { url: webAppUrl } },
					])
				}

				if (user.isMaster) {
					await bot.sendMessage(
						chatId,
						'🎉 Добро пожаловать в приложение для онлайн записи! \n\n Заходите в меню "Мой профиль" для добавления и изменения информации о вас и вашей услуге! \n 👉 Так же там вы сможете сами записать своих клиентов, если на момент использования этого приложения у вас уже есть записи',
						{
							reply_markup: { inline_keyboard: inlineKeyboard },
						}
					)
				} else {
					await bot.sendMessage(
						chatId,
						'🎉 Добро пожаловать в приложение для онлайн записи! \n\n Заходите в меню "Записаться" для осуществления онлайн записи на услугу!',
						{
							reply_markup: { inline_keyboard: inlineKeyboard },
						}
					)
				}
			}
			res.status(200).end()
		} catch (error) {
			console.error('Произошла ошибка:', error)
			res.status(500).json({ error: 'Произошла ошибка: ' + error.message })
		}
	} else {
		res.setHeader('Allow', ['POST'])
		res.status(405).end('Method Not Allowed')
	}
}
