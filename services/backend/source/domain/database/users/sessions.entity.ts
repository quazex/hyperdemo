import { Column, CreateDateColumn, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({
    name: 'users_sessions',
})
export class UsersSessionsEntity {
    @PrimaryColumn({ type: 'uuid' })
    session_id: string;

    @Index('users_sessions_user_id_index')
    @Column({ type: 'uuid' })
    user_id: string;

    @Column({ type: 'varchar', length: 40 })
    status: string;

    @Column({ type: 'text' })
    device: string;

    @Column({ type: 'timestamp' })
    expires_at: Date;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
