import prisma from '@/app/libs/prismadb'
import bot from '@/pages/api/bot'

const webAppUrl = 'https://test-nails-bot.vercel.app/'

export default async function handler(req, res) {
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
			const chat_Id = message.chat.id
			const chatId = chat_Id.toString()
			const text = message.text
			const username = message.chat.username
			const from_Id = message.from.id
			const userId = from_Id.toString()

			if (text === '/start') {
				await bot.sendMessage(
					chatId,
					'🎉 Добро пожаловать в приложение для онлайн записи! \n\n Заходите в меню "Мой профиль" для добавления и изменения информации о вас и вашей услуге! \n 👉 Так же там вы сможете сами записать своих клиентов, если на момент использования этого приложения у вас уже есть записи'
				)
				{
					/*let user = await prisma.user.findUnique({
					where: {
						userId: userId,
					},
				})*/
				}
				if (!user) {
					const masterUserExists = await prisma.user.findFirst({
						where: {
							isMaster: true,
						},
					})
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
						await prisma.master.create({
							data: {
								firstName: message.chat.first_name,
								lastName: message.chat.last_name,
								username: username,
								chatId: chatId,
								userId: userId,
								image: '',
								startTime: '06:00',
								endTime: '06:00',
								interval: 0,
								slotTime: [],
								price: '',
							},
						})
					}
					user = await prisma.user.create({
						data: userData,
					})
				}

				let inlineKeyboard = []

				// Если пользователь мастер, добавляем кнопку "Запись ко мне"
				if (user.isMaster) {
					inlineKeyboard.push([
						{ text: 'Мой профиль', web_app: { url: webAppUrl } },
						{
							text: 'Запись ко мне',
							web_app: { url: `${webAppUrl}/appointment_master` },
						},
					])
				} else {
					// Если пользователь не мастер, добавляем кнопку "Мои записи"
					inlineKeyboard.push([
						{ text: 'Записаться', web_app: { url: webAppUrl } },
						{
							text: 'Мои записи',
							web_app: { url: `${webAppUrl}/appointment_client` },
						},
					])
				}

				if (user.isMaster) {
					await bot.sendMessage(
						chatId,
						'🎉 Добро пожаловать в приложение для онлайн записи! \n\n Заходите в меню "Мой профиль" для добавления и изменения информации о вас и вашей услуге! \n 👉 Так же там вы сможете сами записать своих клиентов, если на момент использования этого приложения у вас уже есть записи',
						{
							reply_markup: {
								inline_keyboard: inlineKeyboard,
							},
						}
					)
				} else {
					await bot.sendMessage(
						chatId,
						'🎉 Добро пожаловать в приложение для онлайн записи! \n\n Заходите в меню "Записаться" для осуществления онлайн записи на услугу!',
						{
							reply_markup: {
								inline_keyboard: inlineKeyboard,
							},
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
