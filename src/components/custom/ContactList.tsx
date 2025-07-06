import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types';
import { UserRound } from 'lucide-react';

interface ContactListProps {
    contacts: User[];
    onOpenChat: (arg: User) => void;
}

const ContactList = ({ contacts, onOpenChat }: ContactListProps) => {
    return (
        <div>
            {contacts?.map((el: User) => {
                return (
                    <div
                        key={el.userId}
                        className="flex gap-2 py-4 border-b-1 cursor-pointer"
                        onClick={() => onOpenChat(el)}
                    >
                        <Avatar>
                            <AvatarImage src={el.thumbnail} />
                            <AvatarFallback>
                                <UserRound className="w-5 h-5 text-gray-500" />
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p>{el.userName}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ContactList;
