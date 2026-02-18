import { cn } from '../../lib/utils';

export function Button({
    className,
    variant = 'primary',
    size = 'md',
    children,
    ...props
}) {
    const variants = {
        primary: 'bg-primary text-white hover:shadow-lg hover:shadow-primary/30 active:scale-95',
        secondary: 'bg-white text-primary border border-slate-200 hover:bg-slate-50',
        ghost: 'bg-transparent text-slate-600 hover:text-primary hover:bg-primary/5',
        outline: 'bg-transparent border border-slate-200 text-slate-600 hover:border-primary hover:text-primary',
        dark: 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-8 py-4 text-base',
        icon: 'p-2.5'
    };

    return (
        <button
            className={cn(
                'font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
