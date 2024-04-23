import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { Avatar } from 'antd' // Заменено на "Avatar"
import React, { useState, useCallback, useRef, useEffect } from 'react'
import { storage } from '../../../firebaseConfig'
import { TbPhotoPlus } from 'react-icons/tb'

interface AvatarUploadProps {
	// Обновлено имя интерфейса
	onChange: (value: string | null) => void
	value: string | null
}

const AvatarUpload = ({ onChange, value }: AvatarUploadProps) => {
	// Заменено имя компонента
	const [imageFile, setImageFile] = useState<File | null>(null)
	const [isUploading, setIsUploading] = useState(false)
	const [progressUpload, setProgressUpload] = useState(0)

	const handleSelectedFile = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			if (event.target.files && event.target.files[0].size < 100000000) {
				setImageFile(event.target.files[0])
			} else {
				// Добавьте здесь обработку случая, когда файл слишком большой
			}
		},
		[]
	)

	const handleUploadFile = useCallback(() => {
		if (imageFile) {
			const name = imageFile.name

			const storageRef = ref(storage, `images/${name}`)
			const uploadTask = uploadBytesResumable(storageRef, imageFile)

			setIsUploading(true)
			uploadTask.on(
				'state_changed',
				snapshot => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					setProgressUpload(progress) // to show progress upload
				},
				error => {
					setIsUploading(false)
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref)
						.then(url => {
							setIsUploading(false)
							onChange(url) // call onChange with the uploaded image URL
							setImageFile(null)
						})
						.catch(error => {
							setIsUploading(false)
						})
				}
			)
		}
	}, [imageFile, onChange])

	useEffect(() => {
		// Проверяем, есть ли выбранный файл
		if (imageFile) {
			handleUploadFile() // Вызываем функцию загрузки файла
		}
	}, [imageFile]) // Выполняем useEffect при изменении imageFile

	const fileInputRef = useRef<HTMLInputElement>(null)

	return (
		<div>
			{value && (
				<div className='flex flex-col items-center space-y-4'>
					<Avatar
						style={{ width: 220, height: 220, objectFit: 'cover' }}
						src={value}
						alt={value}
					/>
					<button
						className='
              p-2 pl-4 pr-4 rounded-full
             
              cursor-pointer
						
              transition

							text-sm
            '
						style={{
							backgroundColor: 'var(--tg-theme-button-color)',
							color: 'var(--tg-theme-button-text-color)',
						}}
						onClick={() => onChange(null)}
					>
						Удалить аватар
					</button>
				</div>
			)}
			{!value && (
				<div
					className='
            relative
            cursor-pointer
            hover:opacity-70
            transition
            border-dashed 
            border-2 
            p-20 
            border-neutral-300
            flex
            flex-col
            justify-center
            items-center
            gap-4
            text-neutral-600
          '
				>
					<TbPhotoPlus
						size={50}
						onClick={() => fileInputRef.current?.click()}
					/>
					<input
						ref={fileInputRef}
						type='file'
						accept='image/*'
						onChange={handleSelectedFile}
						style={{ display: 'none' }}
					/>
					<div className='font-semibold text-lg'>Выбрать файл</div>
				</div>
			)}
		</div>
	)
}

export default AvatarUpload
