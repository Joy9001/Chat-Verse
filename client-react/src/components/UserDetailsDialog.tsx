import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { useMediaQuery } from 'usehooks-ts'

interface UserDetailsFormData {
	name: string
	username: string
	gender: 'Male' | 'Female'
	avatar: string
}

interface UserDetailsDialogProps {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
	register: UseFormRegister<UserDetailsFormData>
	errors: FieldErrors<UserDetailsFormData>
	setValue: UseFormSetValue<UserDetailsFormData>
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
	avatarUrl: string
	onChangeAvatar: () => void
}

function UserDetailsForm({
	register,
	errors,
	setValue,
	onSubmit,
	avatarUrl,
	onChangeAvatar,
	className = '',
}: Omit<UserDetailsDialogProps, 'isOpen' | 'onOpenChange'> & { className?: string }) {
	return (
		<form onSubmit={onSubmit} className={`space-y-4 ${className}`}>
			<div className='space-y-2'>
				<label className='text-primary text-lg font-semibold'>Name</label>
				<Input
					{...register('name')}
					placeholder='Enter your name'
					className='border-2 border-black bg-white text-black'
				/>
				{errors.name && <p className='text-sm text-red-500'>{errors.name.message}</p>}
			</div>

			<div className='space-y-2'>
				<label className='text-primary text-lg font-semibold'>Username</label>
				<Input
					{...register('username')}
					placeholder='Enter your username'
					className='border-2 border-black bg-white text-black'
				/>
				{errors.username && <p className='text-sm text-red-500'>{errors.username.message}</p>}
			</div>

			<div className='space-y-2'>
				<label className='text-primary text-lg font-semibold'>Gender</label>
				<Select
					{...register('gender')}
					onValueChange={(value: 'Male' | 'Female') => setValue('gender', value)}>
					<SelectTrigger className='border-2 border-black bg-white text-black'>
						<SelectValue placeholder='Select gender' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='Male'>Male</SelectItem>
						<SelectItem value='Female'>Female</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className='space-y-4'>
				<label className='text-primary text-lg font-semibold'>Profile Picture</label>
				<div className='flex flex-col items-center space-y-4'>
					<div className='ring-primary ring-offset-base-100 h-24 w-24 rounded-full ring ring-offset-2'>
						<img src={avatarUrl} alt='avatar' className='h-full w-full rounded-full' />
					</div>
					<Button
						type='button'
						onClick={onChangeAvatar}
						className='border-primary bg-primary w-24 border text-white'>
						Change
					</Button>
				</div>
			</div>

			<Button type='submit' className='border-primary bg-primary w-full border text-white'>
				Done
			</Button>
		</form>
	)
}

export function UserDetailsDialog(props: UserDetailsDialogProps) {
	const { isOpen, onOpenChange } = props
	const isDesktop = useMediaQuery('(min-width: 768px)')

	if (isDesktop) {
		return (
			<Dialog open={isOpen} onOpenChange={onOpenChange}>
				<DialogContent className='bg-white sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle className='text-2xl font-bold'>Additional Details</DialogTitle>
					</DialogHeader>
					<UserDetailsForm {...props} />
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer open={isOpen} onOpenChange={onOpenChange}>
			<DrawerContent>
				<DrawerHeader className='text-left'>
					<DrawerTitle className='text-2xl font-bold'>Additional Details</DrawerTitle>
				</DrawerHeader>
				<div className='px-4'>
					<UserDetailsForm {...props} />
				</div>
				<DrawerFooter className='pt-2'>
					<DrawerClose asChild>
						<Button variant='outline' className='w-full'>
							Cancel
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
