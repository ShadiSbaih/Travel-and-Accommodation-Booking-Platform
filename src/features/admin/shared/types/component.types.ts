import type { ReactNode } from 'react';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import type { SvgIconTypeMap } from '@mui/material';

export type AdminViewMode = 'grid' | 'list';

export interface AdminPageHeaderProps {
    title: string;
    count: number;
    singularLabel: string;
    pluralLabel?: string;
    hasSearchQuery: boolean;
    viewMode: AdminViewMode;
    onViewModeChange: (mode: AdminViewMode) => void;
    onAdd: () => void;
    addButtonLabel: string;
    addButtonShortLabel?: string;
    icon: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>> & { muiName: string };
    addButtonIcon?: ReactNode;
}
