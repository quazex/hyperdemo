import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity({
    name: 'users_data',
})
export class UsersDataEntity {
    @PrimaryColumn({ type: 'uuid' })
    user_id: string;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text', nullable: true })
    picture: string;

    @Column({ type: 'varchar', length: 255, select: false })
    provider: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
